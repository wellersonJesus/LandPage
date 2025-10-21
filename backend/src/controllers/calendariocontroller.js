// backend/src/controllers/calendariocontroller.js
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

// 🔹 GET /api/calendario - lista todos os registros
export async function getallcalendarios(req, res, next) {
  try {
    const database = await initdb();
    const calendarios = await database.all('SELECT * FROM calendario');
    res.json(calendarios);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/calendario/:id - busca registro por ID
export async function getcalendariobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const calendario = await database.get('SELECT * FROM calendario WHERE id = ?', id);

    if (!calendario) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(calendario);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/calendario - cria novo registro
export async function createcalendario(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO calendario (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/calendario/:id - atualiza um registro
export async function updatecalendario(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE calendario SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/calendario/:id - remove um registro
export async function deletecalendario(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM calendario WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
