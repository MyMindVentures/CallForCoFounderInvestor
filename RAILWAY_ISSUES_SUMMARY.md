# Railway Deployment Issues - Summary & Fixes

## ✅ Code Fixes Applied

### 1. Added Startup Validation
**File:** `apps/backend/server.js`

**What it does:**
- Validates required environment variables before server starts
- Validates frontend build exists before serving static files
- Provides clear error messages if validation fails

**Benefits:**
- Catches missing variables immediately (no silent failures)
- Prevents server from starting with invalid configuration
- Clear error messages point to exact issues

---

## 🚨 Critical Issues to Check in Railway Logs

### Issue 1: Missing JWT_SECRET
**Error in Logs:**
```
❌ Missing required environment variables:
   - JWT_SECRET
⚠️  Please set these in Railway Variables tab.
```

**Fix:** Set `JWT_SECRET` in Railway → Variables

---

### Issue 2: Missing ADMIN_USERNAME or ADMIN_PASSWORD
**Error in Logs:**
```
❌ Missing required environment variables:
   - ADMIN_USERNAME
   - ADMIN_PASSWORD
⚠️  Please set these in Railway Variables tab.
```

**Fix:** Set both `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Railway → Variables

---

### Issue 3: Frontend Build Not Found
**Error in Logs:**
```
❌ Frontend build not found at: /app/apps/frontend/dist
   Expected file: /app/apps/frontend/dist/index.html
   Build command may have failed. Check build logs.
   Run: npm run build
```

**Possible Causes:**
1. Build command didn't run
2. Build command failed
3. Build output in wrong location

**Check Build Logs For:**
- `npm install` errors
- `npm run build` errors
- Missing dependencies
- Vite build failures

**Fix:** 
- Verify `railway.toml` has: `buildCommand = "npm install && npm run build"`
- Check Railway → Settings → Build Command

---

### Issue 4: Database Connection Error
**Error in Logs:**
```
✗ Database connection error: [error message]
⚠️  Server will start but database operations may fail.
```

**Possible Causes:**
- Database path not writable
- SQLite initialization failed
- File system permissions

**Fix:** 
- Check Railway logs for file system errors
- Verify `data/` directory is writable
- Check `DB_PATH` environment variable (if set)

---

## 📋 Complete Environment Variables Checklist

### ⚠️ CRITICAL (Server won't start without these):
- [ ] `NODE_ENV=production` 
- [ ] `JWT_SECRET` (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] `ADMIN_USERNAME`
- [ ] `ADMIN_PASSWORD`

### ⚠️ REQUIRED (Features will break without these):
- [ ] `EMAIL_USER` (no default)
- [ ] `EMAIL_PASS` (no default)
- [ ] `CLOUDINARY_CLOUD_NAME` (no default)
- [ ] `CLOUDINARY_API_KEY` (no default)
- [ ] `CLOUDINARY_API_SECRET` (no default)

### ✅ OPTIONAL (Have defaults):
- [ ] `EMAIL_HOST` (defaults to `smtp.gmail.com`)
- [ ] `EMAIL_PORT` (defaults to `587`)
- [ ] `EMAIL_FROM` (defaults to `EMAIL_USER`)
- [ ] `PORT` (Railway sets automatically)
- [ ] `DB_PATH` (defaults to `data/database.db`)
- [ ] `WISE_PAYMENT_URL` (used in frontend)

---

## 🔍 How to Check Railway Logs

### Step 1: Access Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Log in to your account
3. Select your project

### Step 2: Check Build Logs
1. Go to: **Your Service → Deployments**
2. Click on the **latest deployment** (failed one)
3. Click on **Build Logs** tab
4. Look for:
   - `npm install` errors
   - `npm run build` errors
   - `Cannot find module` errors
   - `ENOENT` (file not found) errors

### Step 3: Check Runtime Logs
1. Go to: **Your Service → Logs**
2. Look for:
   - `❌ Missing required environment variables`
   - `❌ Frontend build not found`
   - `✗ Database connection error`
   - `JWT_SECRET is not configured`
   - `ADMIN_USERNAME and ADMIN_PASSWORD must be configured`

### Step 4: Check Environment Variables
1. Go to: **Your Service → Variables**
2. Verify all variables from checklist above are set
3. Ensure `NODE_ENV=production` is set

---

## 🎯 Quick Fix Steps

### 1. Fix Missing Variables
```
Railway Dashboard → Your Service → Variables → Add:
- NODE_ENV = production
- JWT_SECRET = [generate strong secret]
- ADMIN_USERNAME = [your username]
- ADMIN_PASSWORD = [strong password]
- EMAIL_USER = [your email]
- EMAIL_PASS = [app password]
- CLOUDINARY_CLOUD_NAME = [from Cloudinary]
- CLOUDINARY_API_KEY = [from Cloudinary]
- CLOUDINARY_API_SECRET = [from Cloudinary]
```

### 2. Fix Build Command
```
Railway Dashboard → Your Service → Settings → Build Command:
npm install && npm run build
```

### 3. Fix Start Command
```
Railway Dashboard → Your Service → Settings → Start Command:
npm run start:prod
```

### 4. Redeploy
- Commit and push `railway.toml` (if not already)
- Railway will auto-deploy
- Or manually trigger: **Deployments → Redeploy**

---

## 📊 Expected Success Logs

When everything is configured correctly:

```
✅ All required environment variables are set
✓ Database connected
✓ SQLite database initialized
✅ Frontend build found
✓ Server running on port 3000
✓ API available at http://localhost:3000/api
```

---

## 🐛 Common Error Patterns

### Pattern 1: Build Fails
```
Error: Cannot find module 'xyz'
→ Dependencies not installed
→ Fix: Check build command includes `npm install`
```

### Pattern 2: Server Starts But Crashes
```
Error: JWT_SECRET is not configured
→ Missing environment variable
→ Fix: Set JWT_SECRET in Railway Variables
```

### Pattern 3: 404 on All Routes
```
Error: ENOENT: no such file or directory 'apps/frontend/dist'
→ Frontend build didn't complete
→ Fix: Check build logs, verify build command
```

### Pattern 4: Database Errors
```
Error: Database connection error
→ File system or permissions issue
→ Fix: Check Railway logs for file system errors
```

---

## 📞 Next Steps

1. **Check Railway Logs** using steps above
2. **Share Error Messages** from logs if still failing
3. **Verify All Variables** are set in Railway dashboard
4. **Test Deployment** after fixes
5. **Monitor Logs** for any new issues

---

## 📚 Related Documents

- `RAILWAY_LOGS_ANALYSIS.md` - Detailed code analysis
- `RAILWAY_DEPLOYMENT_FIX.md` - Comprehensive troubleshooting guide
- `RAILWAY_QUICK_FIX.md` - Quick reference guide
- `railway.toml` - Railway configuration file
