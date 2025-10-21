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

// Conexão com SQLite
const dbPromise = open({
  filename: path.join('./src/db', process.env.SQLITE_PATH_LOCAL || 'wsgestao_local.db'),
  driver: sqlite3.Database
});

// --- Rotas básicas ---

// Rota raiz (lista tabelas)
app.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
    res.json({ message: 'Servidor rodando!', tables });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar tabelas' });
  }
});

// ====================== Cadastro ====================== //

// Listar todos os cadastros
app.get('/cadastro', async (req, res) => {
  try {
    const db = await dbPromise;
    const cadastros = await db.all('SELECT * FROM Cadastro');
    res.json(cadastros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar cadastros' });
  }
});

// Inserir novo cadastro
app.post('/cadastro', async (req, res) => {
  try {
    const { Nome, Email, Telefone, Produto, Quantidade, Valor } = req.body;
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO Cadastro (Nome, Email, Telefone, Produto, Quantidade, Valor) VALUES (?, ?, ?, ?, ?, ?)',
      Nome, Email, Telefone, Produto || '', Quantidade || null, Valor || null
    );
    res.json({ message: 'Cadastro inserido', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir cadastro' });
  }
});

// Atualizar cadastro
app.put('/cadastro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nome, Email, Telefone, Produto, Quantidade, Valor } = req.body;
    const db = await dbPromise;
    await db.run(
      'UPDATE Cadastro SET Nome=?, Email=?, Telefone=?, Produto=?, Quantidade=?, Valor=? WHERE id=?',
      Nome, Email, Telefone, Produto || '', Quantidade || null, Valor || null, id
    );
    res.json({ message: 'Cadastro atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar cadastro' });
  }
});

// Deletar cadastro
app.delete('/cadastro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;
    await db.run('DELETE FROM Cadastro WHERE id=?', id);
    res.json({ message: 'Cadastro deletado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar cadastro' });
  }
});

// ====================== Inventario ====================== //

// Listar inventário
app.get('/inventario', async (req, res) => {
  try {
    const db = await dbPromise;
    const inventario = await db.all('SELECT * FROM Inventario');
    res.json(inventario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar inventário' });
  }
});

// Inserir novo item no inventário
app.post('/inventario', async (req, res) => {
  try {
    const { Produto, Quantidade, Valor } = req.body;
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO Inventario (Produto, Quantidade, Valor) VALUES (?, ?, ?)',
      Produto, Quantidade, Valor
    );
    res.json({ message: 'Item inserido no inventário', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir item no inventário' });
  }
});

// Atualizar item do inventário
app.put('/inventario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Produto, Quantidade, Valor } = req.body;
    const db = await dbPromise;
    await db.run(
      'UPDATE Inventario SET Produto=?, Quantidade=?, Valor=? WHERE id=?',
      Produto, Quantidade, Valor, id
    );
    res.json({ message: 'Item do inventário atualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar item do inventário' });
  }
});

// Deletar item do inventário
app.delete('/inventario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await dbPromise;
    await db.run('DELETE FROM Inventario WHERE id=?', id);
    res.json({ message: 'Item do inventário deletado' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar item do inventário' });
  }
});

app.listen(PORT, async () => {
  console.log(`🛫 Servidor rodando em http://localhost:${PORT}`);
  try {
    await openBrowser(`http://localhost:${PORT}`);
    console.log('🌐 Navegador aberto automaticamente!');
  } catch (err) {
    console.error('❌ Erro ao abrir navegador:', err);
  }
});
