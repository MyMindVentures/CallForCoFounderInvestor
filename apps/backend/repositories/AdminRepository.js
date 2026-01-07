import getDB, { saveDatabase } from '../config/database.js';
import bcrypt from 'bcryptjs';

class AdminRepository {
  async create(data) {
    const db = await getDB();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const stmt = db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)');
    stmt.run([data.username, hashedPassword]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findOne(query) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM admins WHERE username = ?');
    const result = stmt.getAsObject([query.username]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM admins WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async comparePassword(admin, candidatePassword) {
    return await bcrypt.compare(candidatePassword, admin.password);
  }

  formatRow(row) {
    return {
      _id: row.id,
      id: row.id,
      username: row.username,
      password: row.password,
      createdAt: row.createdAt
    };
  }
}

export default new AdminRepository();
