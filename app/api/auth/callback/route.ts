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
        <div id="status">Authorizing...</div>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("Handshake received from origin:", e.origin);
              
              var token = "${data.access_token}";
              var message = {
                action: "github",
                status: "success",
                data: {
                  token: token,
                  provider: "github"
                }
              };
              
              // Send the message back to the opener
              window.opener.postMessage(JSON.stringify(message), e.origin);
              
              document.getElementById('status').innerText = 'Authorized! Closing window...';
              
              // Close the popup
              setTimeout(function() {
                window.close();
              }, 500);
            }

            window.addEventListener("message", receiveMessage, false);

            // Tell the Opener that we are ready
            console.log("Sending ready message to opener");
            window.opener.postMessage("authorizing:github", "*");
            
            // Fallback for some browsers/configs: if no message received in 5s, try sending anyway to common origins
            setTimeout(function() {
              if (document.getElementById('status').innerText === 'Authorizing...') {
                console.log(" हैंडशेक Timeout - trying fallback");
                window.opener.postMessage(JSON.stringify({
                  action: "github",
                  status: "success",
                  data: { token: "${data.access_token}", provider: "github" }
                }), "*");
                window.close();
              }
            }, 5000);
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
