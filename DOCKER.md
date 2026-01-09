# Docker Deployment Guide

This application is containerized using Docker for reliable production deployments.

## Docker Files

- **Dockerfile**: Multi-stage build for production
- **.dockerignore**: Excludes unnecessary files from Docker build context
- **docker-compose.yml**: For local testing and development
- **railway.toml**: Configured to use Docker builder on Railway

## Building the Docker Image

### Local Build

```bash
# Build the image
docker build -t call-for-cofounder-investor:latest .

# Run the container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-secret \
  -e ADMIN_USERNAME=admin \
  -e ADMIN_PASSWORD=your-password \
  -v $(pwd)/data:/data \
  call-for-cofounder-investor:latest
```

### Using Docker Compose

```bash
# Create .env file with your environment variables
cp apps/backend/env.example .env

# Edit .env with your values
# Then run:
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Docker Image Structure

### Multi-Stage Build

1. **Builder Stage**: 
   - Installs all dependencies (including dev dependencies)
   - Builds the frontend React app
   - Outputs to `apps/frontend/dist`

2. **Production Stage**:
   - Only includes production dependencies
   - Copies built frontend static files
   - Runs as non-root user for security
   - Includes health checks

### Security Features

- Runs as non-root user (`nodejs`)
- Uses `dumb-init` for proper signal handling
- Minimal Alpine Linux base image
- Only production dependencies in final image

## Railway Deployment

The `railway.toml` is configured to use Docker:

```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"
```

Railway will:
1. Build the Docker image from the Dockerfile
2. Run the container with your environment variables
3. Mount the persistent volume at `/data` for the database
4. Perform health checks at `/api/health`

## Environment Variables

Required environment variables (set in Railway dashboard):

- `NODE_ENV=production`
- `JWT_SECRET` (32+ characters)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`
- `WISE_PAYMENT_URL`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `DB_PATH=/data/database.db` (for Railway volume mount)

## Database Persistence

The database is stored at `/data/database.db` inside the container. On Railway:
- Create a persistent volume
- Mount it to `/data` in your service settings
- Set `DB_PATH=/data/database.db` environment variable

## Health Checks

The container includes a built-in health check that pings `/api/health` every 30 seconds. Railway also uses this endpoint for service health monitoring.

## Troubleshooting

### Build Fails

- Check that all package.json files are present
- Verify `.npmrc` is included for optional dependencies
- Ensure Node.js version matches (20.19.0)

### Container Won't Start

- Verify all required environment variables are set
- Check logs: `docker logs <container-id>`
- Ensure port 3000 is exposed and not in use

### Database Issues

- Verify volume is mounted correctly
- Check file permissions (should be writable by nodejs user)
- Ensure `DB_PATH` environment variable is set correctly
