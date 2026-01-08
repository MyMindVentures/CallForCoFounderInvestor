import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
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
const isProduction = process.env.NODE_ENV === 'production';

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

// Serve static files from frontend build in production
if (isProduction) {
  const frontendBuildPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendBuildPath));
  
  // Serve React app for all non-API routes
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const db = await getDB();
    const stmt = db.prepare('SELECT 1');
    stmt.step();
    stmt.free();
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'connected'
    });
  } catch (error) {
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      database: 'disconnected'
    });
  }
});

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
