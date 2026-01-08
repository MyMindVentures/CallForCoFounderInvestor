import getDB, { saveDatabase } from '../config/database.js';

class MediaRepository {
  async findByType(type) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM media WHERE type = ?');
    const result = stmt.getAsObject([type]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async findAll() {
    const db = await getDB();
    const results = db.exec('SELECT * FROM media');
    if (results.length === 0) return [];
    
    const columns = results[0].columns;
    return results[0].values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return this.formatRow(obj);
    });
  }

  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO media (type, cloudinaryId, url, publicId, format)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run([
      data.type,
      data.cloudinaryId,
      data.url,
      data.publicId,
      data.format
    ]);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM media WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async upsert(type, data) {
    const db = await getDB();
    const existing = await this.findByType(type);

    if (existing) {
      const stmt = db.prepare(`
        UPDATE media 
        SET cloudinaryId = ?, url = ?, publicId = ?, format = ?, updatedAt = datetime('now')
        WHERE type = ?
      `);
      stmt.run([data.cloudinaryId, data.url, data.publicId, data.format, type]);
      stmt.free();
      saveDatabase();
      return this.findByType(type);
    } else {
      return this.create({ type, ...data });
    }
  }

  async delete(type) {
    const db = await getDB();
    const existing = await this.findByType(type);
    if (!existing) return null;

    const stmt = db.prepare('DELETE FROM media WHERE type = ?');
    stmt.run([type]);
    stmt.free();
    saveDatabase();
    return existing;
  }

  formatRow(row) {
    return {
      _id: row.id,
      id: row.id,
      type: row.type,
      cloudinaryId: row.cloudinaryId,
      url: row.url,
      publicId: row.publicId,
      format: row.format,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
}

// App Projects Repository
class AppProjectsRepository {
  async findAll() {
    const db = await getDB();
    const results = db.exec('SELECT * FROM app_projects ORDER BY createdAt DESC');
    if (results.length === 0) return [];
    
    const columns = results[0].columns;
    return results[0].values.map(row => {
      const obj = {};
      columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return this.formatRow(obj);
    });
  }

  async create(data) {
    const db = await getDB();
    const stmt = db.prepare(`
      INSERT INTO app_projects (name, url, description)
      VALUES (?, ?, ?)
    `);
    stmt.run([data.name, data.url, data.description || '']);
    const lastId = db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
    stmt.free();
    saveDatabase();
    return this.findById(lastId);
  }

  async findById(id) {
    const db = await getDB();
    const stmt = db.prepare('SELECT * FROM app_projects WHERE id = ?');
    const result = stmt.getAsObject([id]);
    stmt.free();
    return result.id ? this.formatRow(result) : null;
  }

  async update(id, data) {
    const db = await getDB();
    const stmt = db.prepare(`
      UPDATE app_projects 
      SET name = ?, url = ?, description = ?
      WHERE id = ?
    `);
    stmt.run([data.name, data.url, data.description || '', id]);
    stmt.free();
    saveDatabase();
    return this.findById(id);
  }

  async delete(id) {
    const db = await getDB();
    const existing = await this.findById(id);
    if (!existing) return null;

    const stmt = db.prepare('DELETE FROM app_projects WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    saveDatabase();
    return existing;
  }

  async replaceAll(projects) {
    const db = await getDB();
    // Clear existing projects
    db.run('DELETE FROM app_projects');
    
    // Insert new projects
    for (const project of projects) {
      const stmt = db.prepare(`
        INSERT INTO app_projects (name, url, description)
        VALUES (?, ?, ?)
      `);
      stmt.run([project.name, project.url, project.description || '']);
      stmt.free();
    }
    
    saveDatabase();
    return this.findAll();
  }

  formatRow(row) {
    return {
      _id: row.id,
      id: row.id,
      name: row.name,
      url: row.url,
      description: row.description,
      createdAt: row.createdAt
    };
  }
}

export const mediaRepository = new MediaRepository();
export const appProjectsRepository = new AppProjectsRepository();
export default mediaRepository;
