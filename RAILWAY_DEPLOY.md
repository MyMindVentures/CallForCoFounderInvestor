# Railway Deployment Guide

This guide will help you deploy the Call for Investor/CoFounder app to Railway.

## Prerequisites

1. A Railway account (sign up at [railway.app](https://railway.app))
2. GitHub account (for connecting your repository)

## Deployment Steps

### 1. Connect Your Repository

1. Log in to [Railway](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `MyMindVentures/CallForCoFounderInvestor`
5. Railway will automatically detect the project

### 2. Configure Environment Variables

Railway will automatically pick up default values from `railway.toml`, but **you MUST override sensitive values** in the Railway dashboard.

#### Option 1: Use Railway Dashboard (Recommended for Sensitive Values)

1. Go to your service → **Variables** tab
2. Railway will show variables from `railway.toml` with default values
3. **Override these sensitive variables** with your production values:
   - `JWT_SECRET` - Generate a strong random string
   - `ADMIN_PASSWORD` - Set a secure password
   - `EMAIL_USER` - Your email address
   - `EMAIL_PASS` - Your Gmail App Password
   - `EMAIL_FROM` - Your email address
   - `WISE_PAYMENT_URL` - Your Wise payment link

#### Option 2: Reference Template File

See `railway.env.example` for a complete list of all required environment variables.

**Important Notes:**
- Railway automatically loads variables from `railway.toml` on deployment
- **Always override** sensitive values (`JWT_SECRET`, `ADMIN_PASSWORD`, `EMAIL_PASS`) in the Railway dashboard
- For Gmail, you'll need to generate an App Password:
  1. Go to Google Account settings
  2. Enable 2-Step Verification
  3. Generate an App Password for "Mail"
  4. Use that password for `EMAIL_PASS`
- Generate a strong `JWT_SECRET` using a random string generator (at least 32 characters)

### 3. Railway Configuration

Railway will automatically:
- Detect the `railway.json` or `railway.toml` configuration
- Run `npm install && npm run build` to build the frontend
- Start the backend server with `npm start --workspace=backend`

### 4. Build Process

The deployment process:
1. **Install dependencies**: `npm install` (installs all workspace dependencies)
2. **Build frontend**: `npm run build` (builds React app to `apps/frontend/dist`)
3. **Start backend**: `npm start --workspace=backend` (starts Express server)

The backend server will:
- Serve API routes at `/api/*`
- Serve static frontend files from `apps/frontend/dist`
- Handle React Router routes by serving `index.html` for non-API routes

### 5. Database

The app uses SQLite, which is file-based. Railway provides persistent storage, so the database file will be created automatically in the `data/` directory and persisted across deployments.

**Note**: For production, consider using Railway's PostgreSQL service if you need:
- Better concurrent access
- Database backups
- Scaling capabilities

### 6. Custom Domain (Optional)

1. In Railway dashboard, go to your service → **Settings** → **Networking**
2. Click **"Generate Domain"** for a Railway domain, or
3. Click **"Custom Domain"** to add your own domain
4. Follow Railway's DNS configuration instructions

### 7. Monitoring

Railway provides:
- **Logs**: View real-time logs in the Railway dashboard
- **Metrics**: Monitor CPU, memory, and network usage
- **Deployments**: View deployment history and rollback if needed

## Troubleshooting

### Build Fails

- Check that all dependencies are listed in `package.json`
- Verify Node.js version compatibility (Railway uses Node 18+ by default)
- Check build logs in Railway dashboard

### Frontend Not Loading

- Verify that `npm run build` completed successfully
- Check that `apps/frontend/dist` directory exists after build
- Verify the static file path in `apps/backend/server.js`

### Database Issues

- Ensure the `data/` directory is writable
- Check Railway logs for database connection errors
- Verify SQLite file permissions

### API Routes Not Working

- Check that CORS is configured correctly
- Verify environment variables are set
- Check Railway logs for API errors

## File Structure

```
.
├── railway.json          # Railway configuration (JSON format)
├── railway.toml          # Railway configuration (TOML format)
├── .railwayignore        # Files to ignore during deployment
├── package.json          # Root package.json with workspaces
├── apps/
│   ├── backend/          # Backend Express server
│   │   ├── server.js     # Main server file (serves static files in production)
│   │   └── ...
│   └── frontend/         # React frontend
│       ├── dist/         # Built frontend (created during build)
│       └── ...
└── ...
```

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `3000` |
| `JWT_SECRET` | Secret for JWT tokens | Yes | - |
| `ADMIN_USERNAME` | Admin login username | Yes | `admin` |
| `ADMIN_PASSWORD` | Admin login password | Yes | - |
| `EMAIL_HOST` | SMTP server host | Yes | - |
| `EMAIL_PORT` | SMTP server port | Yes | `587` |
| `EMAIL_USER` | SMTP username | Yes | - |
| `EMAIL_PASS` | SMTP password | Yes | - |
| `EMAIL_FROM` | Email sender address | Yes | - |
| `WISE_PAYMENT_URL` | Wise payment link | Yes | - |

## Support

For Railway-specific issues, check:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

For app-specific issues, check the main `README.md` file.
