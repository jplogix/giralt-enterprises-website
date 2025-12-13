const GITHUB_API_BASE = 'https://api.github.com'

function getRepoParts(repo: string) {
  const [owner, name] = repo.split('/')
  return { owner, name }
}

async function githubRequest(path: string, method = 'GET', body?: any) {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN not set')

  const res = await fetch(`${GITHUB_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`GitHub API error ${res.status}: ${txt}`)
  }

  return res.json()
}

export async function uploadFileToRepo(repo: string, branch: string, path: string, contentBase64: string, message: string) {
  const { owner, name } = getRepoParts(repo)

  // Check if file exists to include sha for update
  const getPath = `/repos/${owner}/${name}/contents/${encodeURIComponent(path)}`
  let sha: string | undefined
  try {
    const existing = await githubRequest(`${getPath}?ref=${branch}`)
    sha = existing.sha
  } catch (e) {
    // file not found -> will create
  }

  const putPath = `/repos/${owner}/${name}/contents/${encodeURIComponent(path)}`
  const body: any = {
    message,
    content: contentBase64,
    branch,
  }
  if (sha) body.sha = sha

  return githubRequest(putPath, 'PUT', body)
}

export async function updateJsonFile(repo: string, branch: string, jsonPath: string, updater: (current: any) => any, message: string) {
  const { owner, name } = getRepoParts(repo)
  const getPath = `/repos/${owner}/${name}/contents/${encodeURIComponent(jsonPath)}`
  const existing = await githubRequest(`${getPath}?ref=${branch}`)
  const sha = existing.sha
  const content = Buffer.from(existing.content, existing.encoding).toString('utf8')
  const parsed = JSON.parse(content)
  const updated = updater(parsed)
  const updatedBase64 = Buffer.from(JSON.stringify(updated, null, 2)).toString('base64')

  const putPath = `/repos/${owner}/${name}/contents/${encodeURIComponent(jsonPath)}`
  return githubRequest(putPath, 'PUT', {
    message,
    content: updatedBase64,
    branch,
    sha,
  })
}

export default { uploadFileToRepo, updateJsonFile }
