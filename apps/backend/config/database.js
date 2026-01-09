import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultDbPath = path.join(__dirname, '../data/database.db');
const envDbPath = process.env.DB_PATH;

const ensureWritableDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.accessSync(dirPath, fs.constants.W_OK);
};

const resolveDbPath = () => {
  if (envDbPath) {
    try {
      ensureWritableDir(path.dirname(envDbPath));
      return envDbPath;
    } catch (error) {
      console.warn(`⚠️  DB_PATH not writable (${envDbPath}). Falling back to local data directory.`);
    }
  }

  ensureWritableDir(path.dirname(defaultDbPath));
  return defaultDbPath;
};

// Database file path
const dbPath = resolveDbPath();

let db = null;
let SQL = null;

export const getDB = async () => {
  if (!SQL) {
    SQL = await initSqlJs();
  }
  
  if (!db) {
    // Load existing database or create new one
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      // Run migrations on existing database
      runMigrations();
    } else {
      db = new SQL.Database();
      initializeTables();
      saveDatabase();
    }
  }
  
  return db;
};

// Run migrations to add new tables to existing database
const runMigrations = () => {
  // Media table (for videos, profile picture, mindmap)
  db.run(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT UNIQUE NOT NULL,
      cloudinaryId TEXT,
      url TEXT NOT NULL,
      publicId TEXT,
      format TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // App Projects table
  db.run(`
    CREATE TABLE IF NOT EXISTS app_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create index for media table
  try {
    db.run(`CREATE INDEX IF NOT EXISTS idx_media_type ON media(type)`);
  } catch (e) {
    // Index might already exist
  }

  saveDatabase();
};

const initializeTables = () => {
  // Messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      isPositive INTEGER DEFAULT 0,
      isPublished INTEGER DEFAULT 0,
      donationAmount REAL,
      donationId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Donations table
  db.run(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      currency TEXT DEFAULT 'EUR',
      donorEmail TEXT NOT NULL,
      donorName TEXT NOT NULL,
      wiseTransactionId TEXT,
      messageId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Content table
  db.run(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pageId TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedBy TEXT DEFAULT 'admin'
    )
  `);

  // Admin table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Media table (for videos, profile picture, mindmap)
  db.run(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT UNIQUE NOT NULL,
      cloudinaryId TEXT,
      url TEXT NOT NULL,
      publicId TEXT,
      format TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // App Projects table
  db.run(`
    CREATE TABLE IF NOT EXISTS app_projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes
  try {
    db.run(`CREATE INDEX IF NOT EXISTS idx_messages_published ON messages(isPublished, isPositive)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(createdAt)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_content_pageId ON content(pageId)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_media_type ON media(type)`);
  } catch (e) {
    // Indexes might already exist
  }

  console.log('✓ SQLite database initialized');
};

export const saveDatabase = () => {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
};

export const closeDB = () => {
  if (db) {
    saveDatabase();
    db.close();
    db = null;
  }
};

export default getDB;
