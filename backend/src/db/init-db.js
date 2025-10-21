// backend/src/db/init-db.js
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve(process.env.SQLITE_PATH_LOCAL || './wsgestao_local.db');
const dirPath = path.dirname(dbPath);

// Criar pasta do banco se não existir
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`📁 Pasta criada: ${dirPath}`);
}

// Conectar ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('❌ Erro ao abrir o banco:', err.message);
  console.log('🗃️ Conexão com o banco estabelecida.');
});

db.serialize(() => {
  // Tabela Cadastro
  db.run(`
    CREATE TABLE IF NOT EXISTS Cadastro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nome TEXT NOT NULL,
      Email TEXT NOT NULL,
      Telefone TEXT NOT NULL
    )
  `);

  // Inserir dados iniciais
  db.run(`
    INSERT OR IGNORE INTO Cadastro (id, Nome, Email, Telefone) VALUES
      (1, 'Sofia', 'sonia@gmail.com', '31 988664430'),
      (2, 'Carla', 'estefani45@gmail.com', '31 986542325'),
      (3, 'Estefani', '125estefani@gmail.com', '31 984586665'),
      (4, 'Andre', 'andre@barros.gmail.com', '3199999999')
  `);

  // Tabela Inventario
  db.run(`
    CREATE TABLE IF NOT EXISTS Inventario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Produto TEXT NOT NULL,
      Quantidade INTEGER NOT NULL,
      Valor REAL NOT NULL
    )
  `);

  // Inserir dados iniciais
  db.run(`
    INSERT OR IGNORE INTO Inventario (id, Produto, Quantidade, Valor) VALUES
      (1, 'Iphone', 5, 5345.18),
      (2, 'Monitor Samsung', 10, 865.42),
      (3, 'Pendrive', 54, 54.60),
      (4, 'Mouse', 15, 25.99),
      (5, 'Notebook', 10, 125.00)
  `);
});

db.close((err) => {
  if (err) console.error('❌ Erro ao fechar o banco:', err.message);
  else console.log('✅ Banco de dados fechado com sucesso.');
});
