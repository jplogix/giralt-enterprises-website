import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope') || 'repo,user';
  
  const clientId = process.env.GITHUB_CLIENT_ID;
  
  if (!clientId) {
    return NextResponse.json({ error: 'GITHUB_CLIENT_ID is not defined' }, { status: 500 });
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
  
  return NextResponse.redirect(githubAuthUrl);
}
