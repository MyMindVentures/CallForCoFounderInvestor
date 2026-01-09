import jwt from 'jsonwebtoken';
import { logError } from '../utils/errorHandler.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      logError('Auth Middleware', new Error('JWT_SECRET is not configured'));
      return res.status(500).json({ error: 'Server configuration error' });
    }
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    logError('Auth Middleware', error);
    res.status(403).json({ error: 'Invalid token.' });
  }
};
