// backend/src/controllers/contacontroller.js
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

// 🔹 GET /api/conta - lista todos os registros
export async function getallcontas(req, res, next) {
  try {
    const database = await initdb();
    const contas = await database.all('SELECT * FROM conta');
    res.json(contas);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/conta/:id - busca registro por ID
export async function getcontabyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const conta = await database.get('SELECT * FROM conta WHERE id = ?', id);

    if (!conta) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(conta);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/conta - cria novo registro
export async function createconta(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO conta (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/conta/:id - atualiza um registro
export async function updateconta(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE conta SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/conta/:id - remove um registro
export async function deleteconta(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM conta WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
