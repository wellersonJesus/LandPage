// src/db/init-db.js
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto do banco de dados (usando variável do .env ou fallback)
const dbPath = path.resolve(process.env.SQLITE_PATH_LOCAL || path.join(__dirname, 'wsmanager_local.db'));

// Diretório do banco
const dirPath = path.dirname(dbPath);

// ✅ Cria a pasta se não existir
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`📁 Pasta criada automaticamente: ${dirPath}`);
}

// ✅ Verifica permissões de leitura/escrita
try {
  fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK);
} catch (err) {
  console.error('❌ Sem permissão para ler/gravar na pasta do banco:', dirPath);
  process.exit(1);
}

// ✅ Conecta/cria o banco
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('❌ Erro ao abrir/criar banco:', err.message);
    process.exit(1);
  }
  console.log('🗃️ Banco conectado/criado com sucesso em:', dbPath);
});

// ✅ Criação das tabelas
db.serialize(() => {
  console.log('🚀 Criando todas as tabelas...');

  const tables = [
    `CREATE TABLE IF NOT EXISTS empresa (
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
    )`,
    `CREATE TABLE IF NOT EXISTS conta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      banco TEXT,
      tipo TEXT,
      saldo REAL,
      agencia TEXT,
      numero_conta TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS gestao (
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
    )`,
    `CREATE TABLE IF NOT EXISTS calendario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE,
      dia_semana TEXT,
      mes INTEGER,
      ano INTEGER,
      feriado BOOLEAN
    )`,
    `CREATE TABLE IF NOT EXISTS emprestimo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cnpj TEXT,
      descricao TEXT,
      valor_total REAL,
      valor_pago REAL,
      valor_a_pagar REAL,
      data_parcela DATE,
      numero_parcela TEXT,
      valor_parcela REAL
    )`,
    `CREATE TABLE IF NOT EXISTS lancamento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data DATE,
      descricao TEXT,
      tipo TEXT,
      valor REAL,
      categoria TEXT,
      conta_id INTEGER,
      FOREIGN KEY (conta_id) REFERENCES conta(id)
    )`,
    `CREATE TABLE IF NOT EXISTS manutencao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dispositivo_id INTEGER,
      data DATE,
      descricao TEXT,
      custo REAL,
      status TEXT,
      FOREIGN KEY (dispositivo_id) REFERENCES dispositivo(id)
    )`,
    `CREATE TABLE IF NOT EXISTS servidor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      ip TEXT,
      sistema_operacional TEXT,
      status TEXT,
      localizacao TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS dispositivo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      tipo TEXT,
      marca TEXT,
      modelo TEXT,
      numero_serie TEXT,
      status TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS rede (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      ip TEXT,
      mascara TEXT,
      gateway TEXT,
      dns TEXT,
      status TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS contrato (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      empresa_id INTEGER,
      descricao TEXT,
      valor REAL,
      data_inicio DATE,
      data_fim DATE,
      status TEXT,
      FOREIGN KEY (empresa_id) REFERENCES empresa(id)
    )`,
    `CREATE TABLE IF NOT EXISTS skill (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      nivel TEXT,
      categoria TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS plataforma (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      url TEXT,
      tipo TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS curso (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      plataforma_id INTEGER,
      carga_horaria TEXT,
      progresso INTEGER,
      FOREIGN KEY (plataforma_id) REFERENCES plataforma(id)
    )`,
    `CREATE TABLE IF NOT EXISTS investimento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT,
      descricao TEXT,
      valor_aplicado REAL,
      rendimento REAL,
      data_aplicacao DATE
    )`
  ];

  tables.forEach(sql => db.run(sql, (err) => {
    if (err) console.error('❌ Erro criando tabela:', err.message);
  }));

  console.log('✅ Todas as tabelas criadas com sucesso!');
});

// Fecha o banco
db.close((err) => {
  if (err) console.error('❌ Erro ao fechar o banco:', err.message);
  else console.log('✅ Banco de dados fechado com sucesso.');
});
