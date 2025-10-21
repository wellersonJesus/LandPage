// backend/src/controllers/gestaocontroller.js
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

// 🔹 GET /api/gestao - lista todos os registros
export async function getallgestaos(req, res, next) {
  try {
    const database = await initdb();
    const gestaos = await database.all('SELECT * FROM gestao');
    res.json(gestaos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/gestao/:id - busca registro por ID
export async function getgestaobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const gestao = await database.get('SELECT * FROM gestao WHERE id = ?', id);

    if (!gestao) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(gestao);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/gestao - cria novo registro
export async function creategestao(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO gestao (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/gestao/:id - atualiza um registro
export async function updategestao(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE gestao SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/gestao/:id - remove um registro
export async function deletegestao(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM gestao WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
