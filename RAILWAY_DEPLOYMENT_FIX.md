# Railway Deployment Fix Guide

## Issues Identified

Your Railway deployments are failing continuously. Here are the common issues and fixes:

## ✅ Fixes Applied

### 1. Created `railway.toml` Configuration File

I've created a `railway.toml` file at the root of your project with the correct build and start commands:

```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm run start:prod"
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

## 🔍 Common Issues & Solutions

### Issue 1: Railway Not Installing Dependencies Correctly

**Problem:** Railway might not be installing dependencies at the root level for npm workspaces.

**Solution:** The `buildCommand` in `railway.toml` explicitly runs `npm install` first, which installs all workspace dependencies.

### Issue 2: Build Command Not Running

**Problem:** Railway might not be detecting or running the build command.

**Solution:** The `railway.toml` explicitly sets `buildCommand = "npm install && npm run build"` which:
1. Installs all dependencies (including workspace dependencies)
2. Builds the frontend to `apps/frontend/dist`

### Issue 3: Wrong Start Command

**Problem:** Railway might be using the wrong start command.

**Solution:** The `railway.toml` sets `startCommand = "npm run start:prod"` which uses the correct script from your root `package.json`.

### Issue 4: Missing Environment Variables

**Problem:** Required environment variables might not be set in Railway.

**Solution:** Ensure all these variables are set in Railway dashboard → Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | ✅ Yes | Must be `production` |
| `PORT` | ❌ No | Railway sets this automatically |
| `JWT_SECRET` | ✅ Yes | Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_USERNAME` | ✅ Yes | Admin login username |
| `ADMIN_PASSWORD` | ✅ Yes | Strong password |
| `EMAIL_HOST` | ✅ Yes | SMTP server (e.g., `smtp.gmail.com`) |
| `EMAIL_PORT` | ✅ Yes | SMTP port (e.g., `587`) |
| `EMAIL_USER` | ✅ Yes | SMTP username |
| `EMAIL_PASS` | ✅ Yes | SMTP password/app password |
| `EMAIL_FROM` | ✅ Yes | Sender email address |
| `WISE_PAYMENT_URL` | ✅ Yes | Wise payment link |
| `CLOUDINARY_CLOUD_NAME` | ✅ Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✅ Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✅ Yes | Cloudinary API secret |

### Issue 5: Multiple Services Created

**Problem:** Railway might be trying to create separate services for frontend and backend.

**Solution:** 
- Delete any extra services in Railway dashboard
- Keep only ONE service that runs both frontend (static) and backend (API)
- The `railway.toml` ensures this single service configuration

### Issue 6: Database Path Issues

**Problem:** SQLite database might not be writable or path is incorrect.

**Solution:** 
- Railway provides persistent storage
- The database will be created at `data/database.db` (relative to project root)
- Ensure the `data/` directory is writable (Railway handles this automatically)

## 📋 Step-by-Step Fix Process

### Step 1: Verify Railway Configuration

1. Go to Railway dashboard
2. Select your project
3. Go to the service settings
4. Verify these settings match `railway.toml`:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Root Directory:** (leave empty or set to `/`)

### Step 2: Check Environment Variables

1. Go to Railway dashboard → Your Service → Variables
2. Verify all required variables are set (see table above)
3. Ensure `NODE_ENV=production` is set
4. Restart the service after adding/updating variables

### Step 3: Check Build Logs

1. Go to Railway dashboard → Your Service → Deployments
2. Click on the latest deployment
3. Check the **Build Logs** for errors:
   - Look for `npm install` errors
   - Look for `npm run build` errors
   - Look for missing dependencies

### Step 4: Check Runtime Logs

1. Go to Railway dashboard → Your Service → Logs
2. Check for runtime errors:
   - Database connection errors
   - Missing environment variables
   - Port binding errors
   - File system errors

## 🚨 Common Error Messages & Fixes

### Error: "Cannot find module"
**Fix:** Dependencies not installed. Ensure `npm install` runs in build command.

### Error: "ENOENT: no such file or directory 'apps/frontend/dist'"
**Fix:** Build didn't complete. Check build logs. Ensure `npm run build` runs successfully.

### Error: "Port already in use"
**Fix:** Railway sets PORT automatically. Don't hardcode it. Use `process.env.PORT || 3000`.

### Error: "Database connection error"
**Fix:** Check database path. Ensure `data/` directory is writable. Check Railway logs for file system errors.

### Error: "JWT_SECRET is required"
**Fix:** Set `JWT_SECRET` environment variable in Railway dashboard.

## 🔄 Alternative: Manual Railway Configuration

If `railway.toml` doesn't work, configure manually in Railway dashboard:

1. **Service Settings:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
   - Root Directory: `/` (or leave empty)

2. **Environment Variables:**
   - Add all required variables (see table above)

3. **Redeploy:**
   - Trigger a new deployment
   - Monitor build and runtime logs

## ✅ Verification Checklist

After applying fixes, verify:

- [ ] `railway.toml` exists at project root
- [ ] All environment variables are set in Railway
- [ ] Build completes successfully (check build logs)
- [ ] Server starts without errors (check runtime logs)
- [ ] Health check works: `https://your-domain.railway.app/api/health`
- [ ] Frontend loads: `https://your-domain.railway.app/`
- [ ] API endpoints respond: `https://your-domain.railway.app/api/...`

## 📞 Next Steps

1. **Commit and push** the `railway.toml` file to trigger a new deployment
2. **Monitor the deployment** in Railway dashboard
3. **Check logs** if deployment fails
4. **Verify environment variables** are all set correctly
5. **Test the deployed application** once successful

## 🔗 Resources

- [Railway Monorepo Guide](https://docs.railway.app/guides/monorepo)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [Railway Logs](https://docs.railway.app/develop/logs)
