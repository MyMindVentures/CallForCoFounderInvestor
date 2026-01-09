# Container Registry Deployment Guide

This guide explains how to deploy this application using pre-built container images instead of building from source on Railway.

## Why Use Container Images?

- **Faster deployments**: No build time on Railway
- **Consistent builds**: Build once, deploy anywhere
- **Better caching**: Docker layer caching reduces build times
- **CI/CD integration**: Build images in GitHub Actions, deploy on Railway

## Prerequisites

1. Docker installed locally
2. Account on a container registry:
   - [Docker Hub](https://hub.docker.com) (free)
   - [GitHub Container Registry](https://github.com/features/packages) (free, uses GitHub token)
   - Railway's container registry (via Railway CLI)

## Quick Start

### Option 1: Automated via GitHub Actions (Recommended)

1. **Push to main branch** - GitHub Actions will automatically build and push the container image to `ghcr.io`

2. **Configure Railway to use the image**:
   - Go to Railway Dashboard → Your Project → Your Service
   - Click **Settings** → **Source**
   - Change from **"GitHub Repo"** to **"Container Image"**
   - Enter image: `ghcr.io/YOUR_USERNAME/CallForCoFounderInvestor:latest`
   - For authentication (if private):
     - Username: Your GitHub username
     - Password: GitHub Personal Access Token (with `read:packages` permission)

3. **Deploy** - Railway will now pull and deploy the pre-built image

### Option 2: Manual Build and Push

#### Using Docker Hub

```bash
# Build and push to Docker Hub
npm run container:build docker.io YOUR_DOCKERHUB_USERNAME latest

# Or manually:
docker build -f .config/Dockerfile -t YOUR_DOCKERHUB_USERNAME/callforcofounder-investor:latest .
docker push YOUR_DOCKERHUB_USERNAME/callforcofounder-investor:latest
```

Then in Railway:
- Source: **Container Image**
- Image: `YOUR_DOCKERHUB_USERNAME/callforcofounder-investor:latest`

#### Using GitHub Container Registry

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Build and push
docker build -f .config/Dockerfile -t ghcr.io/YOUR_USERNAME/CallForCoFounderInvestor:latest .
docker push ghcr.io/YOUR_USERNAME/CallForCoFounderInvestor:latest
```

#### Using Railway Registry (via Railway CLI)

```bash
# Login to Railway
railway login

# Build and tag for Railway
docker build -f .config/Dockerfile -t railway.app/YOUR_PROJECT_ID:latest .

# Push to Railway registry
railway up --docker
```

## Container Image Tags

The GitHub Actions workflow automatically creates tags:
- `latest` - Latest commit on main branch
- `main` - Latest commit on main branch
- `v1.2.3` - Semantic version tags
- `1.2` - Major.minor version
- `1` - Major version

## Railway Configuration

### Switching to Container Image Source

1. **Via Railway Dashboard**:
   - Project → Service → Settings → Source
   - Select **"Container Image"**
   - Enter full image name: `ghcr.io/username/repo:tag`
   - Add credentials if registry is private

2. **Via Railway CLI**:
   ```bash
   railway service update --source container --image ghcr.io/username/repo:latest
   ```

### Environment Variables

Container deployments use the same environment variables as Git-based deployments. Configure them in:
- Railway Dashboard → Variables tab
- Or via Railway CLI: `railway variables set KEY=value`

## Updating Deployments

### Automatic Updates (GitHub Actions)

Every push to `main` triggers a new container build. Railway can be configured to:
- **Auto-deploy latest**: Railway will pull the `latest` tag automatically
- **Manual deploy**: Deploy specific tags/versions when ready

### Manual Updates

1. Build new image: `npm run container:build`
2. Push to registry: Image is pushed automatically by the script
3. Railway will detect the new image (if using `latest` tag) or you can manually trigger a redeploy

## Troubleshooting

### Authentication Issues

**Problem**: Railway can't pull private images

**Solution**: 
- For GHCR: Use GitHub Personal Access Token with `read:packages` permission
- For Docker Hub: Use Docker Hub access token
- Add credentials in Railway Dashboard → Service → Settings → Container Image

### Image Not Found

**Problem**: Railway reports "image not found"

**Solution**:
- Verify image exists: `docker pull YOUR_IMAGE_NAME:tag`
- Check image name format matches exactly
- Ensure image is public or credentials are set correctly

### Build Failures

**Problem**: Container build fails locally

**Solution**:
- Check Docker is running: `docker ps`
- Verify Dockerfile path: `.config/Dockerfile`
- Check build logs: `docker build -f .config/Dockerfile . --progress=plain`

## Best Practices

1. **Use semantic versioning**: Tag images with versions (`v1.2.3`) for production
2. **Keep `latest` updated**: Always push to `latest` for easy testing
3. **Test locally first**: Run `docker build` and `docker run` before pushing
4. **Monitor image size**: Keep images lean for faster pulls
5. **Use multi-stage builds**: Already configured in `.config/Dockerfile`

## Migration from Git-based to Container-based

1. Build and push your first container image
2. Update Railway service source to use container image
3. Test deployment
4. Once verified, you can disable Git-based builds in Railway settings

## Scripts Reference

- `npm run docker:build` - Build Docker image locally
- `npm run docker:push` - Push Docker image (after building)
- `npm run container:build` - Interactive build and push script (Linux/Mac)
- `npm run container:build:win` - Interactive build and push script (Windows)

## Support

For issues or questions:
- Check Railway logs: `railway logs`
- Check GitHub Actions logs for build issues
- Verify container registry access and permissions
