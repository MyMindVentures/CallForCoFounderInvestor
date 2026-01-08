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

    // Find or create admin user
    let admin = await adminRepository.findOne({ username });
    if (!admin) {
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      admin = await adminRepository.create({
        username: adminUsername,
        password: adminPassword
      });
    }

    // Verify password
    const isValidPassword = await adminRepository.comparePassword(admin, password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || (isProduction ? null : 'your-secret-key');
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
    const adminUsername = process.env.ADMIN_USERNAME || (isProduction ? null : 'admin');
    const adminPassword = process.env.ADMIN_PASSWORD || (isProduction ? null : 'admin123');
    
    if (isProduction && (!adminUsername || !adminPassword)) {
      throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be configured in production');
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
