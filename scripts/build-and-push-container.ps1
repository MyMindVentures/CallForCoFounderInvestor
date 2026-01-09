# Build and push Docker container to registry (PowerShell)
# Usage: .\scripts\build-and-push-container.ps1 [registry] [imagename] [tag]
# Examples:
#   .\scripts\build-and-push-container.ps1 docker.io yourusername latest
#   .\scripts\build-and-push-container.ps1 ghcr.io yourusername latest
#   .\scripts\build-and-push-container.ps1 railway callforcofounder latest

param(
    [string]$Registry = "docker.io",
    [string]$ImageName = "callforcofounder-investor",
    [string]$Tag = "latest"
)

$ErrorActionPreference = "Stop"

# Full image name
if ($Registry -eq "docker.io") {
    # Docker Hub format: docker.io/username/imagename
    $FullImageName = "${Registry}/${ImageName}:${Tag}"
}
elseif ($Registry -eq "ghcr.io") {
    # GitHub Container Registry format: ghcr.io/username/imagename
    $FullImageName = "${Registry}/${ImageName}:${Tag}"
}
elseif ($Registry -eq "railway") {
    # Railway registry - will be set via Railway CLI
    Write-Host "Using Railway registry..."
    $FullImageName = "${ImageName}:${Tag}"
}
else {
    $FullImageName = "${Registry}/${ImageName}:${Tag}"
}

Write-Host "🚀 Building Docker image: $FullImageName" -ForegroundColor Cyan
Write-Host "📦 Dockerfile: .config/Dockerfile"
Write-Host ""

# Build the image
docker build `
    -f .config/Dockerfile `
    -t $FullImageName `
    .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""

# Ask if user wants to push (unless in CI)
if (-not $env:CI) {
    $response = Read-Host "Push image to registry? (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "⏭️  Skipping push. Image built locally as: $FullImageName" -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "📤 Pushing image to registry..." -ForegroundColor Cyan
docker push $FullImageName

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Successfully pushed: $FullImageName" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update Railway service to use container image: $FullImageName"
Write-Host "   2. Or update .config/railway.toml with image source"
Write-Host ""
