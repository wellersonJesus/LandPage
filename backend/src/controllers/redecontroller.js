// backend/src/controllers/redecontroller.js
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

// 🔹 GET /api/rede - lista todos os registros
export async function getallredes(req, res, next) {
  try {
    const database = await initdb();
    const redes = await database.all('SELECT * FROM rede');
    res.json(redes);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/rede/:id - busca registro por ID
export async function getredebyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const rede = await database.get('SELECT * FROM rede WHERE id = ?', id);

    if (!rede) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(rede);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/rede - cria novo registro
export async function createrede(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO rede (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/rede/:id - atualiza um registro
export async function updaterede(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE rede SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/rede/:id - remove um registro
export async function deleterede(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM rede WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
