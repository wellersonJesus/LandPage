// backend/src/controllers/contratocontroller.js
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

// 🔹 GET /api/contrato - lista todos os registros
export async function getallcontratos(req, res, next) {
  try {
    const database = await initdb();
    const contratos = await database.all('SELECT * FROM contrato');
    res.json(contratos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/contrato/:id - busca registro por ID
export async function getcontratobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const contrato = await database.get('SELECT * FROM contrato WHERE id = ?', id);

    if (!contrato) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(contrato);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/contrato - cria novo registro
export async function createcontrato(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO contrato (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/contrato/:id - atualiza um registro
export async function updatecontrato(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE contrato SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/contrato/:id - remove um registro
export async function deletecontrato(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM contrato WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
