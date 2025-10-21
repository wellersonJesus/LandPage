// backend/src/db/init-db.js
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve(process.env.SQLITE_PATH_LOCAL || './backend/src/db/wsgestao_local.db');
const dirPath = path.dirname(dbPath);

// Criar diretório se não existir
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`📁 Pasta criada: ${dirPath}`);
}

// Conexão com o banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('❌ Erro ao abrir o banco:', err.message);
  console.log('🗃️ Banco conectado com sucesso.');
});

db.serialize(() => {
  console.log('🚀 Criando estrutura do banco WS Manager...');

  // ==================================================
  // 🏢 EMPRESA
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS empresa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      slogan TEXT,
      descricao TEXT,
      cnpj TEXT,
      atividade TEXT,
      localizacao TEXT,
      missao TEXT,
      servicos TEXT,
      projetos_destaque TEXT
    )
  `);

  // ==================================================
  // 📈 GESTAO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS gestao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE,
      km_percorrido REAL,
      meta REAL,
      horas_trabalhadas TEXT,
      receita REAL,
      despesa REAL,
      lucro REAL,
      conta_id INTEGER,
      FOREIGN KEY (conta_id) REFERENCES conta(id)
    )
  `);

  // ==================================================
  // 📅 CALENDARIO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS calendario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE,
      dia_semana TEXT,
      mes INTEGER,
      ano INTEGER,
      feriado BOOLEAN
    )
  `);

  // ==================================================
  // 💸 EMPRESTIMO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS emprestimo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cnpj TEXT,
      descricao TEXT,
      valor_total REAL,
      valor_pago REAL,
      valor_a_pagar REAL,
      data_parcela DATE,
      numero_parcela TEXT,
      valor_parcela REAL
    )
  `);

  // ==================================================
  // 📜 LANCAMENTO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS lancamento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE,
      descricao TEXT,
      tipo TEXT,
      valor REAL,
      categoria TEXT,
      conta_id INTEGER,
      FOREIGN KEY (conta_id) REFERENCES conta(id)
    )
  `);

  // ==================================================
  // 🧰 MANUTENCAO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS manutencao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dispositivo_id INTEGER,
      data DATE,
      descricao TEXT,
      custo REAL,
      status TEXT,
      FOREIGN KEY (dispositivo_id) REFERENCES dispositivo(id)
    )
  `);

  // ==================================================
  // 💳 CONTA
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS conta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      banco TEXT,
      tipo TEXT,
      saldo REAL,
      agencia TEXT,
      numero_conta TEXT
    )
  `);

  // ==================================================
  // 🖥️ SERVIDOR
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS servidor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      ip TEXT,
      sistema_operacional TEXT,
      status TEXT,
      localizacao TEXT
    )
  `);

  // ==================================================
  // 💻 DISPOSITIVO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS dispositivo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      tipo TEXT,
      marca TEXT,
      modelo TEXT,
      numero_serie TEXT,
      status TEXT
    )
  `);

  // ==================================================
  // 🌐 REDE
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS rede (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      ip TEXT,
      mascara TEXT,
      gateway TEXT,
      dns TEXT,
      status TEXT
    )
  `);

  // ==================================================
  // 📑 CONTRATO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS contrato (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empresa_id INTEGER,
      descricao TEXT,
      valor REAL,
      data_inicio DATE,
      data_fim DATE,
      status TEXT,
      FOREIGN KEY (empresa_id) REFERENCES empresa(id)
    )
  `);

  // ==================================================
  // 🧠 SKILL
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS skill (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      nivel TEXT,
      categoria TEXT
    )
  `);

  // ==================================================
  // 🎓 CURSO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS curso (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      plataforma_id INTEGER,
      carga_horaria TEXT,
      progresso INTEGER,
      FOREIGN KEY (plataforma_id) REFERENCES plataforma(id)
    )
  `);

  // ==================================================
  // 🔗 PLATAFORMA
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS plataforma (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      url TEXT,
      tipo TEXT
    )
  `);

  // ==================================================
  // 💹 INVESTIMENTO
  // ==================================================
  db.run(`
    CREATE TABLE IF NOT EXISTS investimento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT,
      descricao TEXT,
      valor_aplicado REAL,
      rendimento REAL,
      data_aplicacao DATE
    )
  `);

  console.log('✅ Todas as tabelas criadas com sucesso!');
});

db.close((err) => {
  if (err) console.error('❌ Erro ao fechar o banco:', err.message);
  else console.log('✅ Banco de dados fechado com sucesso.');
});
