// backend/src/controllers/skillcontroller.js
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

// 🔹 GET /api/skill - lista todos os registros
export async function getallskills(req, res, next) {
  try {
    const database = await initdb();
    const skills = await database.all('SELECT * FROM skill');
    res.json(skills);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/skill/:id - busca registro por ID
export async function getskillbyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const skill = await database.get('SELECT * FROM skill WHERE id = ?', id);

    if (!skill) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(skill);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/skill - cria novo registro
export async function createskill(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO skill (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/skill/:id - atualiza um registro
export async function updateskill(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE skill SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/skill/:id - remove um registro
export async function deleteskill(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM skill WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
