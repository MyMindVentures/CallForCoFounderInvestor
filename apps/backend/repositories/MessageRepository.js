import getDB, { saveDatabase } from '../config/database.js';

class MessageRepository {
  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO messages (name, email, message, donationAmount, donationId)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run([
      data.name,
      data.email,
      data.message,
      data.donationAmount || null,
      data.donationId || null
    ]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM messages WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findAll() {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM messages ORDER BY createdAt DESC');
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results.map(row => this.formatRow(row));
  }

  async findPublic() {
    const db = await getDB();
    const stmt = db.prepare(`
      SELECT m.*, d.amount as donation_amount
      FROM messages m
      LEFT JOIN donations d ON m.donationId = d.id
      WHERE m.isPositive = 1 AND m.isPublished = 1
      ORDER BY m.createdAt DESC
    `);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results.map(row => this.formatRow(row));
  }

  async update(id, data) {
    const db = await getDB();
    const updates = [];
    const values = [];

    if (data.isPositive !== undefined) {
      updates.push('isPositive = ?');
      values.push(data.isPositive ? 1 : 0);
    }
    if (data.isPublished !== undefined) {
      updates.push('isPublished = ?');
      values.push(data.isPublished ? 1 : 0);
    }
    if (data.donationAmount !== undefined) {
      updates.push('donationAmount = ?');
      values.push(data.donationAmount);
    }
    if (data.donationId !== undefined) {
      updates.push('donationId = ?');
      values.push(data.donationId);
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const stmt = db.prepare(`UPDATE messages SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(values);
    stmt.free();
    saveDatabase();
    return this.findById(id);
  }

  formatRow(row) {
    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      isPositive: row.isPositive === 1,
      isPublished: row.isPublished === 1,
      donationAmount: row.donationAmount,
      donationId: row.donationId,
      createdAt: row.createdAt
    };
  }
}

export default new MessageRepository();
