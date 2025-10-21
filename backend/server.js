// backend/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import openBrowser from 'open';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Conexão SQLite
const dbPromise = open({
  filename: path.join('./src/db', process.env.SQLITE_PATH_LOCAL || 'wsgestao_local.db'),
  driver: sqlite3.Database
});

// ====================== Rotas ====================== //

// Rota raiz: lista tabelas
app.get('/', async (req, res) => {
  const db = await dbPromise;
  const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
  res.json({ message: 'Servidor rodando!', tables });
});

// ---------------------- Cadastro ---------------------- //
app.get('/cadastro', async (req, res) => {
  const db = await dbPromise;
  const cadastros = await db.all('SELECT * FROM Cadastro');
  res.json(cadastros);
});

app.post('/cadastro', async (req, res) => {
  const { Nome, Email, Telefone } = req.body;
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO Cadastro (Nome, Email, Telefone) VALUES (?, ?, ?)',
    Nome, Email, Telefone
  );
  res.json({ message: 'Cadastro inserido', id: result.lastID });
});

app.put('/cadastro/:id', async (req, res) => {
  const { id } = req.params;
  const { Nome, Email, Telefone } = req.body;
  const db = await dbPromise;
  await db.run(
    'UPDATE Cadastro SET Nome=?, Email=?, Telefone=? WHERE id=?',
    Nome, Email, Telefone, id
  );
  res.json({ message: 'Cadastro atualizado' });
});

app.delete('/cadastro/:id', async (req, res) => {
  const { id } = req.params;
  const db = await dbPromise;
  await db.run('DELETE FROM Cadastro WHERE id=?', id);
  res.json({ message: 'Cadastro deletado' });
});

// ---------------------- Inventario ---------------------- //
app.get('/inventario', async (req, res) => {
  const db = await dbPromise;
  const inventario = await db.all('SELECT * FROM Inventario');
  res.json(inventario);
});

app.post('/inventario', async (req, res) => {
  const { Produto, Quantidade, Valor } = req.body;
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO Inventario (Produto, Quantidade, Valor) VALUES (?, ?, ?)',
    Produto, Quantidade, Valor
  );
  res.json({ message: 'Item inserido no inventário', id: result.lastID });
});

app.put('/inventario/:id', async (req, res) => {
  const { id } = req.params;
  const { Produto, Quantidade, Valor } = req.body;
  const db = await dbPromise;
  await db.run(
    'UPDATE Inventario SET Produto=?, Quantidade=?, Valor=? WHERE id=?',
    Produto, Quantidade, Valor, id
  );
  res.json({ message: 'Item do inventário atualizado' });
});

app.delete('/inventario/:id', async (req, res) => {
  const { id } = req.params;
  const db = await dbPromise;
  await db.run('DELETE FROM Inventario WHERE id=?', id);
  res.json({ message: 'Item do inventário deletado' });
});

// ====================== Iniciar servidor ====================== //
app.listen(PORT, async () => {
  console.log(`🛫 Servidor rodando em http://localhost:${PORT}`);
  try {
    await openBrowser(`http://localhost:${PORT}`);
    console.log('🌐 Navegador aberto automaticamente!');
  } catch (err) {
    console.error('❌ Erro ao abrir navegador:', err);
  }
});
