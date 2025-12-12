import { type NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getGalleryDataAsJson } from '@/lib/gallery-data'

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Commit message is required' },
        { status: 400 }
      )
    }

    const githubToken = process.env.GITHUB_TOKEN
    const githubRepo = process.env.GITHUB_REPO // Format: owner/repo

    if (!githubToken || !githubRepo) {
      return NextResponse.json(
        { 
          error: 'GitHub integration not configured. Please set GITHUB_TOKEN and GITHUB_REPO environment variables.',
          configured: false
        },
        { status: 400 }
      )
    }

    // Get the current gallery data (from memory cache in production, file in dev)
    const fileContent = getGalleryDataAsJson()
    const fileContentBase64 = Buffer.from(fileContent).toString('base64')

    // Get the current file SHA (required for updating)
    const [owner, repo] = githubRepo.split('/')
    const filePath = 'data/gallery-data.json'

    // Get the current file SHA
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    let sha: string | undefined
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json()
      sha = fileData.sha
    }

    // Commit the file
    const commitResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: fileContentBase64,
          sha, // Include SHA if updating existing file
          branch: process.env.GITHUB_BRANCH || 'main',
        }),
      }
    )

    if (!commitResponse.ok) {
      const error = await commitResponse.json()
      console.error('GitHub API error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to commit to GitHub' },
        { status: commitResponse.status }
      )
    }

    const result = await commitResponse.json()

    return NextResponse.json({
      success: true,
      commit: {
        sha: result.commit.sha,
        message: result.commit.message,
        url: result.commit.html_url,
      },
    })
  } catch (error) {
    console.error('Git commit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

