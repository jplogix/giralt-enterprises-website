# Email Configuration Guide

This guide will help you set up email delivery for the contact form to ensure messages are sent to **<info@giraltenterprises.com>**.

## Current Status

The contact form API is configured to send emails to `info@giraltenterprises.com` automatically. You just need to configure an email service.

## Setup Options

### Option 1: Resend (Recommended for Vercel) ⭐

Resend is the easiest option and works perfectly with Vercel deployments.

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com)
   - Create a free account (100 emails/day on free tier)

2. **Get your API key**
   - Go to API Keys in the dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Configure your environment**
   - Copy `.env.example` to `.env.local`
   - Add your Resend API key:

     ```bash
     RESEND_API_KEY=re_your_actual_api_key_here
     EMAIL_FROM=noreply@yourdomain.com
     ```

4. **Verify domain (for production)**
   - In Resend dashboard, go to Domains
   - Add your domain (e.g., giraltenterprises.com)
   - Follow DNS verification instructions
   - Once verified, update `EMAIL_FROM` to use your domain

5. **Install Resend package**

   ```bash
   pnpm add resend
   ```

### Option 2: SMTP (Gmail, Office365, etc.)

Use this if you prefer to use your existing email provider.

#### Using Gmail

1. **Enable 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Create App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other"
   - Generate password
   - Copy the 16-character password

3. **Configure environment**
   - Copy `.env.example` to `.env.local`
   - Add SMTP settings:

     ```bash
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=your-email@gmail.com
     SMTP_PASS=your-16-char-app-password
     SMTP_FROM=your-email@gmail.com
     ```

4. **Install nodemailer**

   ```bash
   pnpm add nodemailer
   pnpm add -D @types/nodemailer
   ```

#### Using Office 365

```bash
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=your-email@yourdomain.com
```

## Testing

1. **Start the development server**

   ```bash
   pnpm dev
   ```

2. **Test the contact form**
   - Navigate to `/contact`
   - Fill out the form
   - Submit
   - Check that email arrives at <info@giraltenterprises.com>

3. **Check logs**
   - If email service is not configured, submissions will be logged to console
   - Watch terminal for "Contact Form Submission" messages

## Production Deployment (Vercel)

1. **Add environment variables to Vercel**
   - Go to your project settings on Vercel
   - Navigate to Environment Variables
   - Add your email service credentials:
     - `RESEND_API_KEY` (if using Resend)
     - Or SMTP variables (if using SMTP)

2. **Redeploy**
   - Push your changes to trigger a new deployment
   - Or manually redeploy from Vercel dashboard

## Troubleshooting

### Email not sending

1. Check environment variables are set correctly
2. Verify the email service package is installed (`resend` or `nodemailer`)
3. Check server logs for error messages
4. Test with a simple email first

### Gmail blocking sign-in

- Make sure 2-Step Verification is enabled
- Use an App Password, not your regular password
- Check [Less secure app access](https://myaccount.google.com/lesssecureapps) is not blocking

### Resend domain not verified

- Check DNS records are properly configured
- Wait up to 48 hours for DNS propagation
- Use `onboarding@resend.dev` for testing (limited to your own email)

## Email Destination

All contact form submissions are automatically sent to:
**<info@giraltenterprises.com>**

This is hardcoded in the API endpoint at `/app/api/contact/route.ts` for security.

## Need Help?

- Resend docs: <https://resend.com/docs>
- Nodemailer docs: <https://nodemailer.com>
- Check the API logs in Vercel deployment logs
