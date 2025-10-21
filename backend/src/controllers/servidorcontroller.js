// backend/src/controllers/servidorcontroller.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { KEYS } from '../utils/keys.js';

// Inicializa o banco SQLite
let db;
async function initdb() {
  if (!db) {
    db = await open({
      filename: KEYS.SQLITE_PATH,
      driver: sqlite3.Database
    });
  }
  return db;
}

// 🔹 GET /api/servidor - lista todos os registros
export async function getallservidors(req, res, next) {
  try {
    const database = await initdb();
    const servidors = await database.all('SELECT * FROM servidor');
    res.json(servidors);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/servidor/:id - busca registro por ID
export async function getservidorbyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const servidor = await database.get('SELECT * FROM servidor WHERE id = ?', id);

    if (!servidor) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(servidor);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/servidor - cria novo registro
export async function createservidor(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO servidor (nome, descricao) VALUES (?, ?)',
      [nome, descricao || null]
    );

    res.status(201).json({
      id: result.lastID,
      nome,
      descricao
    });
  } catch (err) {
    next(err);
  }
}

// 🔹 PUT /api/servidor/:id - atualiza um registro
export async function updateservidor(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE servidor SET nome = ?, descricao = ? WHERE id = ?',
      [nome, descricao, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ id, nome, descricao });
  } catch (err) {
    next(err);
  }
}

// 🔹 DELETE /api/servidor/:id - remove um registro
export async function deleteservidor(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM servidor WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
