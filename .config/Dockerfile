# Multi-stage Dockerfile for production deployment
# Using Debian slim instead of Alpine for better npm optional dependency support
# This avoids the Rollup optional dependency installation issues
# Stage 1: Build frontend
FROM node:20.19.0-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY apps/backend/package*.json ./apps/backend/

# Copy npmrc for optional dependencies
COPY .npmrc ./

# Install all dependencies (including dev dependencies for build)
# Debian-based images handle optional dependencies better than Alpine
RUN npm install --include=optional --legacy-peer-deps

# Fix Rollup optional dependency issue
# Install the platform-specific Rollup binary explicitly
RUN npm install @rollup/rollup-linux-x64-gnu --no-save --legacy-peer-deps || true

# Copy source files
COPY apps/frontend ./apps/frontend
COPY apps/backend ./apps/backend

# Build frontend
RUN npm run build --workspace=frontend

# Stage 2: Production runtime
FROM node:20.19.0-slim AS production

# Ensure production defaults for Railway/runtime
ENV NODE_ENV=production

# Install dumb-init for proper signal handling
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Create non-root user for security
RUN groupadd -r -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nodejs

# Copy root package files (needed for workspaces)
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY apps/frontend/package*.json ./apps/frontend/

# Copy npmrc
COPY .npmrc ./

# Create apps directory structure for workspace
RUN mkdir -p apps/backend apps/frontend

# Install only production dependencies
# Install at root level to maintain workspace structure
# We only need backend dependencies in production, but workspace structure requires root install
RUN npm ci --omit=dev --include=optional && \
    npm cache clean --force

# Copy built frontend from builder stage
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist

# Copy backend source files
COPY apps/backend ./apps/backend

# Create data directory for database (will be mounted as volume in Railway)
RUN mkdir -p /data && \
    chown -R nodejs:nodejs /app /data

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "run", "start:prod"]
