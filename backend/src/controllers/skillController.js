// backend/src/controllers/SkillController.js
import db from '../db/dbConnection.js';

// Listar todas as Skills
export const getAllSkills = (req, res) => {
  db.all('SELECT * FROM Skill', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Skill por ID
export const getSkillById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Skill WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Skill não encontrada' });
    res.json(row);
  });
};

// Criar nova Skill
export const createSkill = (req, res) => {
  const { nome, nivel, categoria } = req.body;
  const sql = `INSERT INTO Skill (nome, nivel, categoria) 
               VALUES (?, ?, ?)`;
  const params = [nome, nivel, categoria];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Skill
export const updateSkill = (req, res) => {
  const { id } = req.params;
  const { nome, nivel, categoria } = req.body;
  const sql = `UPDATE Skill 
               SET nome=?, nivel=?, categoria=? 
               WHERE id=?`;
  const params = [nome, nivel, categoria, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Skill não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Skill
export const deleteSkill = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Skill WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Skill não encontrada' });
    res.json({ message: 'Skill deletada com sucesso' });
  });
};
