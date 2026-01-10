import getDB, { saveDatabase } from '../config/database.js';

class CommentRepository {
  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO story_comments (name, comment, language, isPositive, isPublished)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run([
      data.name,
      data.comment,
      data.language || null,
      data.isPositive ? 1 : 0,
      data.isPublished ? 1 : 0
    ]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM story_comments WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findAll() {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM story_comments ORDER BY createdAt DESC');
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results.map((row) => this.formatRow(row));
  }

  async findPublic(language) {
    const db = await getDB();
    let stmt;
    if (language) {
      stmt = db.prepare(`
        SELECT * FROM story_comments
        WHERE isPositive = 1 AND isPublished = 1 AND (language = ? OR language IS NULL OR language = '')
        ORDER BY createdAt DESC
      `);
      stmt.bind([language]);
    } else {
      stmt = db.prepare(`
        SELECT * FROM story_comments
        WHERE isPositive = 1 AND isPublished = 1
        ORDER BY createdAt DESC
      `);
    }
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results.map((row) => this.formatRow(row));
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

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const stmt = db.prepare(`UPDATE story_comments SET ${updates.join(', ')} WHERE id = ?`);
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
      comment: row.comment,
      language: row.language,
      isPositive: row.isPositive === 1,
      isPublished: row.isPublished === 1,
      createdAt: row.createdAt
    };
  }
}

export default new CommentRepository();
