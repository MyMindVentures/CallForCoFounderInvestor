import getDB from '../config/database.js';

export const checkDatabase = async (req, res, next) => {
  try {
    const db = await getDB();
    // Simple check - try to query
    const stmt = db.prepare('SELECT 1');
    stmt.step();
    stmt.free();
    next();
  } catch (error) {
    return res.status(503).json({ 
      error: 'Database not available',
      message: 'Database connection error. Please check the server logs.'
    });
  }
};
