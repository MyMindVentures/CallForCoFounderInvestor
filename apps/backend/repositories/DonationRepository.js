import getDB, { saveDatabase } from '../config/database.js';

class DonationRepository {
  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO donations (amount, currency, donorEmail, donorName, wiseTransactionId, messageId)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run([
      data.amount,
      data.currency || 'EUR',
      data.donorEmail,
      data.donorName,
      data.wiseTransactionId || null,
      data.messageId || null
    ]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM donations WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findAll() {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM donations ORDER BY createdAt DESC');
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results.map(row => this.formatRow(row));
  }

  async getStats() {
    const db = await getDB();
    const stmt = db.prepare(`
      SELECT 
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as total,
        COALESCE(AVG(amount), 0) as average
      FROM donations
    `);
    const result = stmt.getAsObject();
    stmt.free();
    return {
      count: result.count,
      total: result.total,
      average: result.average
    };
  }

  formatRow(row) {
    return {
      _id: row.id,
      id: row.id,
      amount: row.amount,
      currency: row.currency,
      donorEmail: row.donorEmail,
      donorName: row.donorName,
      wiseTransactionId: row.wiseTransactionId,
      messageId: row.messageId,
      createdAt: row.createdAt
    };
  }
}

export default new DonationRepository();
