// backend/src/db/dbConnection.js
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.SQLITE_PATH_LOCAL || path.join(__dirname, 'wsmanager_local.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error('❌ Erro ao abrir o banco de dados:', err.message);
  else console.log('🗃️ Conectado ao banco SQLite em', dbPath);
});

export default db;
