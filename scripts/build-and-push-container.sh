#!/bin/bash
# Build and push Docker container to registry
# Usage: ./scripts/build-and-push-container.sh [registry] [tag]
# Examples:
#   ./scripts/build-and-push-container.sh docker.io/yourusername latest
#   ./scripts/build-and-push-container.sh ghcr.io/yourusername latest
#   ./scripts/build-and-push-container.sh railway latest

set -e

# Default values
REGISTRY="${1:-docker.io}"
IMAGE_NAME="${2:-callforcofounder-investor}"
TAG="${3:-latest}"

# Full image name
if [[ "$REGISTRY" == "docker.io" ]]; then
  # Docker Hub format: docker.io/username/imagename
  FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"
elif [[ "$REGISTRY" == "ghcr.io" ]]; then
  # GitHub Container Registry format: ghcr.io/username/imagename
  FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"
elif [[ "$REGISTRY" == "railway" ]]; then
  # Railway registry - will be set via Railway CLI
  echo "Using Railway registry..."
  FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"
else
  FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"
fi

echo "🚀 Building Docker image: ${FULL_IMAGE_NAME}"
echo "📦 Dockerfile: .config/Dockerfile"
echo ""

# Build the image
docker build \
  -f .config/Dockerfile \
  -t "${FULL_IMAGE_NAME}" \
  .

echo ""
echo "✅ Build complete!"
echo ""

# Ask if user wants to push (unless in CI)
if [[ -z "$CI" ]]; then
  read -p "Push image to registry? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⏭️  Skipping push. Image built locally as: ${FULL_IMAGE_NAME}"
    exit 0
  fi
fi

echo "📤 Pushing image to registry..."
docker push "${FULL_IMAGE_NAME}"

echo ""
echo "✅ Successfully pushed: ${FULL_IMAGE_NAME}"
echo ""
echo "📝 Next steps:"
echo "   1. Update Railway service to use container image: ${FULL_IMAGE_NAME}"
echo "   2. Or update .config/railway.toml with image source"
echo ""
