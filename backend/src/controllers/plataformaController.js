// backend/src/controllers/PlataformaController.js
import db from '../db/dbConnection.js';

// Listar todas as Plataformas
export const getAllPlataformas = (req, res) => {
  db.all('SELECT * FROM Plataforma', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Plataforma por ID
export const getPlataformaById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Plataforma WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Plataforma não encontrada' });
    res.json(row);
  });
};

// Criar nova Plataforma
export const createPlataforma = (req, res) => {
  const { nome, url, tipo } = req.body;
  const sql = `INSERT INTO Plataforma (nome, url, tipo) 
               VALUES (?, ?, ?)`;
  const params = [nome, url, tipo];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Plataforma
export const updatePlataforma = (req, res) => {
  const { id } = req.params;
  const {  nome, url, tipo } = req.body;
  const sql = `UPDATE Plataforma 
               SET nome=?, url=?, tipo=? 
               WHERE id=?`;
  const params = [nome, url, tipo, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Plataforma não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Plataforma
export const deletePlataforma = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Plataforma WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Plataforma não encontrada' });
    res.json({ message: 'Plataforma deletada com sucesso' });
  });
};
