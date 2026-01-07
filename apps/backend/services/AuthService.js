import adminRepository from '../repositories/AdminRepository.js';
import jwt from 'jsonwebtoken';

class AuthService {
  async login(username, password) {
    // Find or create admin user
    let admin = await adminRepository.findOne({ username });
    if (!admin) {
      admin = await adminRepository.create({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123'
      });
    }

    // Verify password
    const isValidPassword = await adminRepository.comparePassword(admin, password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return {
      token,
      username: admin.username
    };
  }

  async initializeAdmin() {
    const existingAdmin = await adminRepository.findOne({ 
      username: process.env.ADMIN_USERNAME || 'admin' 
    });
    
    if (existingAdmin) {
      return { message: 'Admin already exists' };
    }

    await adminRepository.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });

    return { message: 'Admin user created successfully' };
  }
}

export default new AuthService();
