# Production (Vercel) Setup Guide

## Issue: JSON Parse Error on Image Upload (Production)

When uploading images on your production site (Vercel), you were getting:

```
JSON parse unexpected character at line 1 col 1
```

This happens because the GitHub API calls in production can fail with network errors that weren't properly caught, causing Next.js to return an HTML error page instead of JSON.

## ✅ Fixed Issues

### 1. Network Error Handling

**Problem**: GitHub API `fetch()` calls could throw network errors that escaped the try-catch
**Solution**: Wrapped all GitHub API calls in individual try-catch blocks with proper error responses

### 2. JSON Response Guarantee

**Problem**: Server errors could result in HTML responses that the client couldn't parse
**Solution**: All error paths now return proper JSON with status codes and details

### 3. Better Error Messages

**Problem**: Vague "upload failed" messages
**Solution**: Detailed error messages with GitHub API status codes, network issues, and configuration problems

## 🚀 Setup Steps for Vercel

### Step 1: Create GitHub Personal Access Token

1. Go to <https://github.com/settings/tokens>
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `Vercel Image Upload`
4. Set expiration (or no expiration for convenience)
5. Check the `repo` scope (full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

### Step 2: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

#### Required Variables

```bash
# Admin authentication
ADMIN_PASSWORD=your_secure_password_here

# GitHub integration for image uploads
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=jplogix/giralt-enterprises-website
GITHUB_BRANCH=main
```

#### Variable Details

| Variable | Value | Purpose |
|----------|-------|---------|
| `ADMIN_PASSWORD` | Your secure password | Protects admin panel |
| `GITHUB_TOKEN` | Your GitHub PAT | Allows committing images to repo |
| `GITHUB_REPO` | `jplogix/giralt-enterprises-website` | Target repository |
| `GITHUB_BRANCH` | `main` | Branch to commit to |

4. Make sure to set these for **Production** environment
5. Click "Save" for each variable

### Step 3: Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger deployment

## 🧪 Testing

### Test Upload Flow

1. **Login to admin panel**:
   - Visit `https://your-domain.com/admin/login`
   - Enter your `ADMIN_PASSWORD`

2. **Navigate to images**:
   - Go to `https://your-domain.com/admin/images`
   - Click "Upload Image"

3. **Upload a test image**:
   - Select an image file (JPEG, PNG, or WebP)
   - Enter a title
   - Select a category
   - Click "Upload Image"

4. **Verify success**:
   - Check for success toast message
   - Go to GitHub repo and verify the image was committed to `public/images/giralt/{category}/`
   - Visit the gallery page to see the image

### If You Get Errors

#### "Unauthorized" (401)

- **Cause**: Not logged in or session expired
- **Fix**: Login again at `/admin/login`

#### "GitHub integration not configured" (400)

- **Cause**: Missing `GITHUB_TOKEN` or `GITHUB_REPO` env vars
- **Fix**: Add them in Vercel settings and redeploy

#### "Failed to connect to GitHub API" (503)

- **Cause**: Network error reaching GitHub
- **Fix**: Check GitHub status, verify token is valid, try again

#### "Repository not found" (404)

- **Cause**: Wrong `GITHUB_REPO` format or repo doesn't exist
- **Fix**: Verify format is `owner/repo`, check repo exists, verify token has access

#### "GitHub token does not have permission" (403)

- **Cause**: Token lacks write access or `repo` scope
- **Fix**: Regenerate token with `repo` scope, update Vercel env var

#### "Invalid request" (422)

- **Cause**: File path or content issue
- **Fix**: Check browser console for details, verify file is valid image

## 📊 How It Works (Production)

### Upload Flow

```
1. User uploads image → Client sends FormData to /api/admin/images/upload
2. Server checks authentication
3. Server validates file (type, size)
4. Server reads file as base64
5. Server commits to GitHub via API:
   - Check repo exists
   - Check if file exists (to get SHA if updating)
   - Create/update file with PUT request
6. GitHub stores file in public/images/giralt/{category}/
7. Server returns success with path
8. Client creates image record in database
9. Image appears on site immediately (Next.js serves from public/)
```

### Why GitHub Integration?

Vercel's filesystem is **ephemeral** (read-only/temporary), so you can't write files to it permanently. By committing to GitHub:

- Images are stored permanently in your repo
- Vercel serves them from the `public/` directory
- Images persist across deployments
- You have version control for images

## 🔧 Troubleshooting

### Check Vercel Logs

1. Go to Vercel dashboard
2. Click on your deployment
3. Go to **Functions** tab
4. Look for `/api/admin/images/upload` function
5. Check logs for error details

### Check Browser Console

1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for errors (red messages)
4. Check **Network** tab for failed requests
5. Click on failed request to see details

### Common Issues

**Image doesn't appear after upload:**

- Wait 30-60 seconds for GitHub to sync
- Clear browser cache
- Check if commit appeared in GitHub repo
- Verify image record was created (check `/api/admin/images` response)

**Upload takes very long:**

- GitHub API can be slow (30-60 seconds is normal)
- Large images take longer to encode as base64
- Network issues can cause delays

**Repeated failures:**

- Check GitHub token hasn't expired
- Verify repository name is correct
- Ensure branch exists
- Check GitHub API status: <https://www.githubstatus.com/>

## 📝 Environment Variable Template

Copy this to your Vercel environment variables:

```bash
# Admin Panel
ADMIN_PASSWORD=YourSecurePasswordHere123!

# GitHub Integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=jplogix/giralt-enterprises-website
GITHUB_BRANCH=main
```

## 🔐 Security Notes

- **Never commit** `.env.local` to Git (it's in `.gitignore`)
- Store tokens securely in Vercel's environment variables
- Use a strong `ADMIN_PASSWORD`
- GitHub token should only have `repo` scope (principle of least privilege)
- Rotate tokens periodically for security

## ✅ Verification Checklist

Before marking this as resolved:

- [ ] Environment variables added to Vercel
- [ ] Site redeployed after adding variables
- [ ] Can login to admin panel
- [ ] Can upload an image successfully
- [ ] Image appears in GitHub repository
- [ ] Image displays on gallery page
- [ ] No console errors during upload
- [ ] Success toast appears after upload

## 📞 Need Help?

If you're still experiencing issues:

1. **Check logs**: Vercel Function logs and browser console
2. **Verify env vars**: All 4 variables set correctly
3. **Test token**: Use GitHub API directly to verify token works
4. **Check permissions**: Ensure token has repo write access
5. **GitHub status**: Check if GitHub is having issues

---

**Last Updated**: December 17, 2025
**Fixed**: Network error handling for GitHub API calls in production
