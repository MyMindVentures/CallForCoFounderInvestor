import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDB from './config/database.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import donationRoutes from './routes/donations.js';
import contentRoutes from './routes/content.js';
import mediaRoutes from './routes/media.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
// Ensure NODE_ENV is set for production
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const isProduction = process.env.NODE_ENV === 'production';

// Validate required environment variables in production
if (isProduction) {
  const requiredVars = [
    'JWT_SECRET',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD'
  ];
  
  const missing = requiredVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\n⚠️  Please set these in Railway Variables tab.');
    console.error('   Server will not start without these variables.\n');
    process.exit(1);
  }
  console.log('✅ All required environment variables are set');
}

// Initialize database
(async () => {
  try {
    await getDB();
    console.log('✓ Database connected');
  } catch (error) {
    console.error('✗ Database connection error:', error.message);
    console.error('⚠️  Server will start but database operations may fail.\n');
  }
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

// Health check endpoints (must be before static file serving)
// Backend health check endpoint for Railway
app.get('/api/health', async (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'backend',
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    checks: {
      database: 'unknown',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      }
    }
  };

  // Check database connection
  try {
    const db = await getDB();
    const stmt = db.prepare('SELECT 1');
    stmt.step();
    stmt.free();
    healthCheck.checks.database = 'connected';
  } catch (error) {
    healthCheck.checks.database = 'disconnected';
    healthCheck.status = 'DEGRADED';
  }

  // Return appropriate status code
  const statusCode = healthCheck.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(healthCheck);
});

// Frontend health check endpoint (for separate frontend service if needed)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'frontend',
    message: 'Frontend service is running'
  });
});

// Serve static files from frontend build in production
if (isProduction) {
  const frontendBuildPath = path.join(__dirname, '../frontend/dist');
  const indexPath = path.join(frontendBuildPath, 'index.html');
  
  // Validate frontend build exists
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Frontend build not found at:', frontendBuildPath);
    console.error('   Expected file:', indexPath);
    console.error('   Build command may have failed. Check build logs.');
    console.error('   Run: npm run build\n');
    process.exit(1);
  }
  console.log('✅ Frontend build found');
  
  app.use(express.static(frontendBuildPath));
  
  // Serve React app for all non-API routes
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(indexPath);
  });
}

const server = app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n✗ Port ${PORT} is already in use!`);
    console.error('\nTo fix this, you can:');
    console.error(`  1. Kill the process using port ${PORT}:`);
    console.error(`     Windows: netstat -ano | findstr :${PORT}`);
    console.error(`             taskkill /PID <PID> /F`);
    console.error(`     macOS/Linux: lsof -ti:${PORT} | xargs kill -9`);
    console.error(`  2. Or change the PORT in your .env file\n`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});
