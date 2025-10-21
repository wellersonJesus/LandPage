// backend/src/controllers/dispositivocontroller.js
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

// 🔹 GET /api/dispositivo - lista todos os registros
export async function getalldispositivos(req, res, next) {
  try {
    const database = await initdb();
    const dispositivos = await database.all('SELECT * FROM dispositivo');
    res.json(dispositivos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/dispositivo/:id - busca registro por ID
export async function getdispositivobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const dispositivo = await database.get('SELECT * FROM dispositivo WHERE id = ?', id);

    if (!dispositivo) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(dispositivo);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/dispositivo - cria novo registro
export async function createdispositivo(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO dispositivo (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/dispositivo/:id - atualiza um registro
export async function updatedispositivo(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE dispositivo SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/dispositivo/:id - remove um registro
export async function deletedispositivo(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM dispositivo WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
