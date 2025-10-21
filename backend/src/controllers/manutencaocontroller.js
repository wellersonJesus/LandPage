// backend/src/controllers/manutencaocontroller.js
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

// 🔹 GET /api/manutencao - lista todos os registros
export async function getallmanutencaos(req, res, next) {
  try {
    const database = await initdb();
    const manutencaos = await database.all('SELECT * FROM manutencao');
    res.json(manutencaos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/manutencao/:id - busca registro por ID
export async function getmanutencaobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const manutencao = await database.get('SELECT * FROM manutencao WHERE id = ?', id);

    if (!manutencao) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(manutencao);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/manutencao - cria novo registro
export async function createmanutencao(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO manutencao (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/manutencao/:id - atualiza um registro
export async function updatemanutencao(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE manutencao SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/manutencao/:id - remove um registro
export async function deletemanutencao(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM manutencao WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
