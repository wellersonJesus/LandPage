// backend/src/controllers/investimentocontroller.js
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

// 🔹 GET /api/investimento - lista todos os registros
export async function getallinvestimentos(req, res, next) {
  try {
    const database = await initdb();
    const investimentos = await database.all('SELECT * FROM investimento');
    res.json(investimentos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/investimento/:id - busca registro por ID
export async function getinvestimentobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const investimento = await database.get('SELECT * FROM investimento WHERE id = ?', id);

    if (!investimento) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(investimento);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/investimento - cria novo registro
export async function createinvestimento(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO investimento (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/investimento/:id - atualiza um registro
export async function updateinvestimento(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE investimento SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/investimento/:id - remove um registro
export async function deleteinvestimento(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM investimento WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
