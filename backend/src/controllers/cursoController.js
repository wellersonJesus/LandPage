// backend/src/controllers/CursoController.js
import db from '../db/dbConnection.js';

// Listar todas as Cursos
export const getAllCursos = (req, res) => {
  db.all('SELECT * FROM Curso', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Curso por ID
export const getCursoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Curso WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Curso não encontrada' });
    res.json(row);
  });
};

// Criar nova Curso
export const createCurso = (req, res) => {
  const { nome, plataforma_id, carga_horaria, progresso } = req.body;
  const sql = `INSERT INTO Curso (nome, plataforma_id, carga_horaria, progresso) 
               VALUES (?, ?, ?, ?)`;
  const params = [nome, plataforma_id, carga_horaria, progresso];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Curso
export const updateCurso = (req, res) => {
  const { id } = req.params;
  const { nome, plataforma_id, carga_horaria, progresso } = req.body;
  const sql = `UPDATE Curso 
               SET nome=?, plataforma_id=?, carga_horaria=?, progresso=? 
               WHERE id=?`;
  const params = [nome, plataforma_id, carga_horaria, progresso, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Curso não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Curso
export const deleteCurso = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Curso WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Curso não encontrada' });
    res.json({ message: 'Curso deletada com sucesso' });
  });
};
