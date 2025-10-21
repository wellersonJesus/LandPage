// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import openBrowser from 'open'; // pacote 'open' para abrir navegador automaticamente

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar JSON
app.use(express.json());

// Abrir conexão com SQLite usando async/await
const dbPromise = open({
  filename: path.join('./src/db', process.env.SQLITE_PATH_LOCAL || 'wsgestao_local.db'),
  driver: sqlite3.Database
});

// --- Rotas ---

// Rota raiz
app.get('/', async (req, res) => {
  const db = await dbPromise;
  const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
  res.json({ message: 'Servidor rodando!', tables });
});

// --- Iniciar servidor ---
app.listen(PORT, async () => {
  console.log(`🛫 Servidor rodando em http://localhost:${PORT}`);

  // Abrir navegador automaticamente
  try {
    await openBrowser(`http://localhost:${PORT}`);
    console.log('🌐 Navegador aberto automaticamente!');
  } catch (err) {
    console.error('❌ Erro ao abrir o navegador:', err);
  }
});
