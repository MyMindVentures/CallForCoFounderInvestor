import adminRepository from '../repositories/AdminRepository.js';
import jwt from 'jsonwebtoken';

class AuthService {
  async login(username, password) {
    // Validate required environment variables in production
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }
      if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured in production');
      }
    }

    // Find admin user - must exist, no auto-creation in production
    const admin = await adminRepository.findOne({ username });
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await adminRepository.comparePassword(admin, password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      jwtSecret,
      { expiresIn: '24h' }
    );

    return {
      token,
      username: admin.username
    };
  }

  async initializeAdmin() {
    const isProduction = process.env.NODE_ENV === 'production';
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminUsername || !adminPassword) {
      if (isProduction) {
        throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured in production');
      }
      // In development, allow defaults but warn
      throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured');
    }

    const existingAdmin = await adminRepository.findOne({ 
      username: adminUsername 
    });
    
    if (existingAdmin) {
      return { message: 'Admin already exists' };
    }

    await adminRepository.create({
      username: adminUsername,
      password: adminPassword
    });

    return { message: 'Admin user created successfully' };
  }
}

export default new AuthService();
