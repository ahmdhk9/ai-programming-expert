// نظام قاعدة البيانات الحقيقي
const { Pool } = require('pg');

class DatabaseService {
  constructor() {
    // استخدام Replit Database
    this.connectionString = process.env.DATABASE_URL || 'postgresql://localhost';
    this.pool = new Pool({ connectionString: this.connectionString });
  }

  // إنشاء الجداول
  async initializeTables() {
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        auth_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )`,
      
      `CREATE TABLE IF NOT EXISTS earnings (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        amount DECIMAL(15,2),
        source VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      )`,
      
      `CREATE TABLE IF NOT EXISTS withdrawals (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        amount DECIMAL(15,2),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      )`,
      
      `CREATE TABLE IF NOT EXISTS deployments (
        id SERIAL PRIMARY KEY,
        platform VARCHAR(100),
        url VARCHAR(255),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      )`
    ];

    for (const query of queries) {
      await this.pool.query(query);
    }
  }

  // إدراج بيانات
  async insertData(table, data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  // جلب البيانات
  async getData(table, where = {}) {
    let query = `SELECT * FROM ${table}`;
    const values = [];
    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map((key, i) => `${key} = $${i + 1}`).join(' AND ');
      query += ` WHERE ${conditions}`;
      values.push(...Object.values(where));
    }
    const result = await this.pool.query(query, values);
    return result.rows;
  }
}

module.exports = new DatabaseService();
