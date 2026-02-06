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
            var token = "${data.access_token}";
            var message = {
              action: "github",
              status: "success",
              data: {
                token: token,
                provider: "github"
              }
            };
            
            // Function to send the message
            function send(origin) {
               console.log("Attempting to send token to opener at origin:", origin);
               var msgString = JSON.stringify(message);
               
               try {
                 window.opener.postMessage(msgString, origin);
                 window.opener.postMessage(message, origin);
                 console.log("Messages sent.");
               } catch (err) {
                 console.error("Error sending postMessage:", err);
               }
               
               document.getElementById('status').innerText = 'Authorized! Success message sent. PLEASE CLOSE THIS WINDOW MANUALLY TO FINALIZE LOGIN.';
               /*
               setTimeout(function() { 
                 console.log("Closing window...");
                 window.close(); 
               }, 2000);
               */
            }

            window.addEventListener("message", function(e) {
               console.log("Handshake received from opener:", e.origin, e.data);
               send(e.origin);
            }, false);

            console.log("Pinging opener...");
            window.opener.postMessage("authorizing:github", "*");
            
            setTimeout(function() {
               if (document.getElementById('status').innerText === 'Authorizing...') {
                  console.log("Handshake Timeout - trying fallback send to current origin and wildcard");
                  send(window.location.origin);
                  send("*");
               }
            }, 6000);
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
