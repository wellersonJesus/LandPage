// backend/src/controllers/plataformacontroller.js
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

// 🔹 GET /api/plataforma - lista todos os registros
export async function getallplataformas(req, res, next) {
  try {
    const database = await initdb();
    const plataformas = await database.all('SELECT * FROM plataforma');
    res.json(plataformas);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/plataforma/:id - busca registro por ID
export async function getplataformabyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const plataforma = await database.get('SELECT * FROM plataforma WHERE id = ?', id);

    if (!plataforma) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(plataforma);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/plataforma - cria novo registro
export async function createplataforma(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO plataforma (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/plataforma/:id - atualiza um registro
export async function updateplataforma(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE plataforma SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/plataforma/:id - remove um registro
export async function deleteplataforma(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM plataforma WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
