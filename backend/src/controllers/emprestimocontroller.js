// backend/src/controllers/emprestimocontroller.js
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

// 🔹 GET /api/emprestimo - lista todos os registros
export async function getallemprestimos(req, res, next) {
  try {
    const database = await initdb();
    const emprestimos = await database.all('SELECT * FROM emprestimo');
    res.json(emprestimos);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /api/emprestimo/:id - busca registro por ID
export async function getemprestimobyid(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const emprestimo = await database.get('SELECT * FROM emprestimo WHERE id = ?', id);

    if (!emprestimo) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json(emprestimo);
  } catch (err) {
    next(err);
  }
}

// 🔹 POST /api/emprestimo - cria novo registro
export async function createemprestimo(req, res, next) {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
    }

    const database = await initdb();
    const result = await database.run(
      'INSERT INTO emprestimo (nome, descricao) VALUES (?, ?)',
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

// 🔹 PUT /api/emprestimo/:id - atualiza um registro
export async function updateemprestimo(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const database = await initdb();
    const result = await database.run(
      'UPDATE emprestimo SET nome = ?, descricao = ? WHERE id = ?',
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

// 🔹 DELETE /api/emprestimo/:id - remove um registro
export async function deleteemprestimo(req, res, next) {
  try {
    const { id } = req.params;
    const database = await initdb();
    const result = await database.run('DELETE FROM emprestimo WHERE id = ?', id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Gestão não encontrada' });
    }

    res.json({ message: 'Gestão removida com sucesso' });
  } catch (err) {
    next(err);
  }
}
