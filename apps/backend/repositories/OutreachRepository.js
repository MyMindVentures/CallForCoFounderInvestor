import getDB, { saveDatabase } from '../config/database.js';

class OutreachRepository {
  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO outreach_contacts (
        name,
        category,
        url,
        contactDetails,
        sentMessage,
        sentAt,
        repliedAt,
        replyMessage
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run([
      data.name,
      data.category,
      data.url || null,
      data.contactDetails || null,
      data.sentMessage || null,
      data.sentAt || null,
      data.repliedAt || null,
      data.replyMessage || null
    ]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM outreach_contacts WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findAll() {
    const db = await getDB();
    const stmt = db.prepare(`
      SELECT *
      FROM outreach_contacts
      ORDER BY sentAt DESC, createdAt DESC
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

    if (Object.prototype.hasOwnProperty.call(data, 'name')) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'category')) {
      updates.push('category = ?');
      values.push(data.category);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'url')) {
      updates.push('url = ?');
      values.push(data.url);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'contactDetails')) {
      updates.push('contactDetails = ?');
      values.push(data.contactDetails);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'sentMessage')) {
      updates.push('sentMessage = ?');
      values.push(data.sentMessage);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'sentAt')) {
      updates.push('sentAt = ?');
      values.push(data.sentAt);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'repliedAt')) {
      updates.push('repliedAt = ?');
      values.push(data.repliedAt);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'replyMessage')) {
      updates.push('replyMessage = ?');
      values.push(data.replyMessage);
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const stmt = db.prepare(`
      UPDATE outreach_contacts
      SET ${updates.join(', ')}, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(values);
    stmt.free();
    saveDatabase();
    return this.findById(id);
  }

  async delete(id) {
    const db = await getDB();
    const stmt = db.prepare('DELETE FROM outreach_contacts WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    saveDatabase();
    return { id };
  }

  formatRow(row) {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      url: row.url,
      contactDetails: row.contactDetails,
      sentMessage: row.sentMessage,
      sentAt: row.sentAt,
      repliedAt: row.repliedAt,
      replyMessage: row.replyMessage,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
}

export default new OutreachRepository();
