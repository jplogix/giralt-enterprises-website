# Image Upload JSON Parse Error - Fix Documentation

## Problem

When uploading images, you encountered: `JSON parse unexpected character at line 1 col 1`

## Root Causes Identified & Fixed

### 1. Missing Environment Variables

**Issue**: No `.env.local` file existed, causing authentication to fail silently.

**Solution**: Created `.env.local` with required variables:

```bash
ADMIN_PASSWORD=your_secure_password_here
GITHUB_TOKEN=your_github_token_here  # Optional, for production
GITHUB_REPO=owner/repository-name     # Optional, for production
GITHUB_BRANCH=main                     # Optional, for production
```

### 2. Improved Error Handling

**Enhanced**: `/app/api/admin/images/upload/route.ts`

- Better form data parsing error handling
- More detailed error messages with stack traces
- Clearer error responses

**Enhanced**: `/components/admin/image-upload.tsx`

- Check content-type before parsing JSON
- Display first 500 chars of non-JSON responses in console
- Better error messages for debugging

## How to Use

### 1. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and set your admin password
nano .env.local  # or use any text editor
```

### 2. Set a Secure Admin Password

Replace `your_secure_password_here` with an actual secure password.

### 3. Login to Admin Panel

1. Navigate to `/admin/login`
2. Enter your password
3. You'll be redirected to `/admin`

### 4. Upload Images

1. Go to `/admin/images`
2. Click "Upload Image"
3. Select file, enter title, choose category
4. Click "Upload Image"

## Development vs Production

### Development (Local)

- Images are saved to `public/images/giralt/{category}/`
- No GitHub integration required
- Changes are immediate

### Production (Vercel)

- Images are committed to GitHub repository
- Requires `GITHUB_TOKEN`, `GITHUB_REPO`, and `GITHUB_BRANCH`
- Create token at: <https://github.com/settings/tokens>
- Required scope: `repo` (full control)

## Troubleshooting

### Still Getting JSON Parse Error?

1. **Check if you're logged in**: Go to `/admin/login` first
2. **Check browser console**: Look for the full error message
3. **Check server logs**: Look in terminal for "Upload error:" messages
4. **Verify environment**: Restart dev server after changing `.env.local`

### Authentication Not Working?

1. Make sure `.env.local` exists and has `ADMIN_PASSWORD` set
2. Restart the dev server: `pnpm dev`
3. Clear cookies and try logging in again
4. Check browser console for auth errors

### Images Not Showing Up?

- **Development**: Check `public/images/giralt/{category}/` directory
- **Production**: Check GitHub repo for commits
- **Both**: Check browser Network tab for 404 errors

## Technical Details

### Authentication Flow

1. User logs in at `/admin/login`
2. Server validates password against `ADMIN_PASSWORD`
3. Server creates session token and sets cookie
4. Upload requests check cookie via `isAuthenticated()`
5. If not authenticated, returns 401 JSON response

### Upload Flow

1. Client sends FormData to `/api/admin/images/upload`
2. Server validates auth, file type, size
3. **Dev**: Writes to filesystem
4. **Prod**: Commits to GitHub via API
5. Client creates image record via `/api/admin/images`
6. Image appears in gallery

## Files Modified

- `/app/api/admin/images/upload/route.ts` - Enhanced error handling
- `/components/admin/image-upload.tsx` - JSON parse error detection
- `/.env.local` - Created (you need to edit)
- `/.env.example` - Created for documentation
