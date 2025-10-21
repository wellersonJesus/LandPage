// backend/src/controllers/cursocontroller.js
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

// 🔹 GET /api/curso - lista todos os registros
export async function getallcursos(req, res, next) {
  try {
    const database = await initdb();
    const cursos = await database.all('SELECT * FROM curso');
    res.json(cursos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/curso/:id - busca registro por ID
export async function getcursobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const curso = await database.get('SELECT * FROM curso WHERE id = ?', id);

    if (!curso) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(curso);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/curso - cria novo registro
export async function createcurso(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO curso (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/curso/:id - atualiza um registro
export async function updatecurso(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE curso SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/curso/:id - remove um registro
export async function deletecurso(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM curso WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
