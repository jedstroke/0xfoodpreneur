import Database from 'better-sqlite3';
import path from 'path';

// Initialize the database
// Initialize the database lazily to avoid build-time errors
let db: Database.Database | undefined;

export function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'transactions.db');
    db = new Database(dbPath);

    // Create the table if it doesn't exist
    db.exec(`
          CREATE TABLE IF NOT EXISTS processed_payments (
            tx_ref TEXT PRIMARY KEY,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);
  }
  return db;
}

export default getDb;
