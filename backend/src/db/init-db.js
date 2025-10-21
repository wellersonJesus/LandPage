// backend/src/db/init-db.js
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Caminho do banco (usa variável de ambiente ou padrão)
const dbPath = path.resolve(process.env.SQLITE_PATH_LOCAL || './wsgestao_local.db');
const dirPath = path.dirname(dbPath);

// ✅ Garantir que a pasta do banco exista
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`📁 Pasta criada: ${dirPath}`);
}

// ✅ Conectar/criar o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao abrir o banco de dados:', err.message);
    return;
  }
  console.log('🗃️ Conexão com o banco de dados estabelecida.');
});

// ✅ Criar tabelas e inserir dados
db.serialize(() => {
  // --- Tabela Cadastro ---
  db.run(`
    CREATE TABLE IF NOT EXISTS Cadastro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nome TEXT NOT NULL,
      Email TEXT NOT NULL,
      Telefone TEXT NOT NULL,
      Produto TEXT,
      Quantidade INTEGER,
      Valor REAL
    )
  `, (err) => {
    if (err) console.error('❌ Erro ao criar tabela Cadastro:', err.message);
    else console.log('✅ Tabela Cadastro criada.');
  });

  // Inserir dados iniciais em Cadastro
  db.run(`
    INSERT OR IGNORE INTO Cadastro (id, Nome, Email, Telefone, Produto, Quantidade, Valor) VALUES
      (1, 'Sofia', 'sonia@gmail.com', '31 988664430', '', NULL, NULL),
      (2, 'Carla', 'estefani45@gmail.com', '31 986542325', '', NULL, NULL),
      (3, 'Estefani', '125estefani@gmail.com', '31 984586665', '', NULL, NULL),
      (4, 'Andre', 'andre@barros.gmail.com', '3199999999', '', NULL, NULL)
  `, (err) => {
    if (err) console.error('❌ Erro ao inserir dados em Cadastro:', err.message);
    else console.log('✅ Dados iniciais inseridos em Cadastro.');
  });

  // --- Tabela Inventario ---
  db.run(`
    CREATE TABLE IF NOT EXISTS Inventario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Produto TEXT NOT NULL,
      Quantidade INTEGER NOT NULL,
      Valor REAL NOT NULL
    )
  `, (err) => {
    if (err) console.error('❌ Erro ao criar tabela Inventario:', err.message);
    else console.log('✅ Tabela Inventario criada.');
  });

  // Inserir dados iniciais em Inventario
  db.run(`
    INSERT OR IGNORE INTO Inventario (id, Produto, Quantidade, Valor) VALUES
      (1, 'Iphone', 5, 5345.18),
      (2, 'Monitor Samsung', 10, 865.42),
      (3, 'Pendrive', 54, 54.60),
      (4, 'Mouse', 15, 25.99),
      (5, 'Notebook', 10, 125.00)
  `, (err) => {
    if (err) console.error('❌ Erro ao inserir dados em Inventario:', err.message);
    else console.log('✅ Dados iniciais inseridos em Inventario.');
  });
});

// ✅ Fechar banco ao final
db.close((err) => {
  if (err) console.error('❌ Erro ao fechar o banco de dados:', err.message);
  else console.log('✅ Banco de dados fechado com sucesso.');
});
