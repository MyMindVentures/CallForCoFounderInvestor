# Railway Environment Variables Quick Reference

This file lists all environment variables that Railway will automatically detect from `railway.toml` when deploying.

## Variable Precedence

1. **Railway Dashboard Variables** (Highest Priority) - Override any values
2. **railway.toml [variables]** - Default values loaded automatically
3. **Application defaults** - Fallback if not set

## Required Variables (Must Set in Railway Dashboard)

These variables have placeholder values in `railway.toml` and **MUST** be overridden:

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |
| `ADMIN_PASSWORD` | Admin login password | `YourSecurePassword123!` |
| `EMAIL_USER` | SMTP email username | `your-email@gmail.com` |
| `EMAIL_PASS` | SMTP email password (Gmail App Password) | `abcd efgh ijkl mnop` |
| `EMAIL_FROM` | Email sender address | `your-email@gmail.com` |
| `WISE_PAYMENT_URL` | Wise payment link | `https://wise.com/pay/abc123xyz` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abcDEF123ghiJKL456` |

## Optional Variables (Defaults in railway.toml)

These have default values but can be overridden if needed:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `3000` | Server port (Railway sets this automatically) |
| `ADMIN_USERNAME` | `admin` | Admin login username |
| `EMAIL_HOST` | `smtp.gmail.com` | SMTP server host |
| `EMAIL_PORT` | `587` | SMTP server port |

## How to Set Variables in Railway

### Method 1: Railway Dashboard (Recommended)

1. Go to [Railway Dashboard](https://railway.app)
2. Select your project → service
3. Click **"Variables"** tab
4. Click **"New Variable"** or edit existing ones
5. Set the variable name and value
6. Click **"Add"** or **"Update"**

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Set variables
railway variables set JWT_SECRET=your-secret-key
railway variables set ADMIN_PASSWORD=your-password
railway variables set EMAIL_USER=your-email@gmail.com
railway variables set EMAIL_PASS=your-app-password
railway variables set EMAIL_FROM=your-email@gmail.com
railway variables set WISE_PAYMENT_URL=https://wise.com/pay/your-link
```

## Generating Secure Values

### JWT_SECRET
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Online generator
# Visit: https://randomkeygen.com/
```

### Gmail App Password

1. Go to [Google Account](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable if not enabled)
3. App passwords → Select app: "Mail" → Select device: "Other"
4. Copy the generated 16-character password
5. Use it as `EMAIL_PASS` (no spaces)

### Cloudinary Credentials

1. Sign up for free at [Cloudinary](https://cloudinary.com/users/register/free)
2. Go to your [Dashboard](https://console.cloudinary.com/console)
3. Find your credentials in the "Account Details" section:
   - **Cloud Name**: Your unique cloud identifier
   - **API Key**: Your public API key
   - **API Secret**: Your private API secret (keep this secure!)
4. Free tier includes:
   - 25GB storage
   - 25GB bandwidth per month
   - Up to 200MB file upload size

## Variable Validation

After setting variables, verify they're loaded:

1. Check Railway logs for startup messages
2. Visit `/api/health` endpoint to verify server is running
3. Check Railway dashboard → Variables tab to confirm all are set

## Security Best Practices

✅ **DO:**
- Use strong, random values for `JWT_SECRET` (32+ characters)
- Use unique, strong passwords for `ADMIN_PASSWORD`
- Use Gmail App Passwords (not your regular password)
- Rotate secrets periodically
- Never commit sensitive values to git

❌ **DON'T:**
- Use default values for production
- Share sensitive variables publicly
- Use weak passwords
- Commit `.env` files with real values

## Troubleshooting

### Variables Not Loading

- Check Railway dashboard → Variables tab
- Verify variable names match exactly (case-sensitive)
- Check Railway logs for errors
- Ensure `railway.toml` is in the root directory

### Application Not Starting

- Verify all required variables are set
- Check variable values for typos
- Review Railway logs for specific errors
- Test variables locally with `.env` file first

### Email Not Working

- Verify `EMAIL_PASS` is a Gmail App Password (not regular password)
- Check that 2-Step Verification is enabled
- Verify `EMAIL_USER` and `EMAIL_FROM` match
- Test SMTP connection with a simple email test
