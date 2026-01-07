import getDB, { saveDatabase } from '../config/database.js';

class ContentRepository {
  async findOne(query) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM content WHERE pageId = ?');
    const result = stmt.getAsObject([query.pageId]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO content (pageId, content, updatedBy)
      VALUES (?, ?, ?)
    `);
    stmt.run([
      data.pageId,
      data.content,
      data.updatedBy || 'admin'
    ]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM content WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findOneAndUpdate(query, update, options = {}) {
    const db = await getDB();
    const existing = await this.findOne(query);

    if (existing) {
      const stmt = db.prepare(`
        UPDATE content 
        SET content = ?, lastUpdated = datetime('now'), updatedBy = ?
        WHERE pageId = ?
      `);
      stmt.run([update.content, update.updatedBy, query.pageId]);
      stmt.free();
      saveDatabase();
      return this.findOne(query);
    } else if (options.upsert) {
      return this.create({
        pageId: query.pageId,
        content: update.content,
        updatedBy: update.updatedBy
      });
    }
    return null;
  }

  formatRow(row) {
    return {
      _id: row.id,
      id: row.id,
      pageId: row.pageId,
      content: row.content,
      lastUpdated: row.lastUpdated,
      updatedBy: row.updatedBy
    };
  }
}

export default new ContentRepository();
