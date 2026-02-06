import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error_description || data.error }, { status: 500 });
    }

    // This script is what Decap CMS expects to receive to finalize login
    const content = `
      <!DOCTYPE html>
      <html>
      <head><title>Authorization Successful</title></head>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("Receive message:", e);
              // Handle postMessage from Decap CMS
              var token = "${data.access_token}";
              var message = {
                action: "github",
                status: "success",
                data: {
                  token: token,
                  provider: "github"
                }
              };
              window.opener.postMessage(JSON.stringify(message), e.origin);
            }
            window.addEventListener("message", receiveMessage, false);
            // Tell the Opener that we are ready
            window.opener.postMessage("authorizing:github", "*");
          })()
        </script>
      </body>
      </html>
    `;

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.json({ error: 'Failed to exchange code for token' }, { status: 500 });
  }
}
