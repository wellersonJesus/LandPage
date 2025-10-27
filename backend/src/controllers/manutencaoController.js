// backend/src/controllers/ManutencaoController.js
import db from '../db/dbConnection.js';

// Listar todas as Manutencaos
export const getAllManutencaos = (req, res) => {
  db.all('SELECT * FROM Manutencao', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Manutencao por ID
export const getManutencaoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Manutencao WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Manutencao não encontrada' });
    res.json(row);
  });
};

// Criar nova Manutencao
export const createManutencao = (req, res) => {
  const {  dispositivo_id, data, descricao, custo, status } = req.body;
  const sql = `INSERT INTO Manutencao ( dispositivo_id, data, descricao, custo, status) 
               VALUES (?, ?, ?, ?, ?)`;
  const params = [ dispositivo_id, data, descricao, custo, status];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Manutencao
export const updateManutencao = (req, res) => {
  const { id } = req.params;
  const {  dispositivo_id, data, descricao, custo, status } = req.body;
  const sql = `UPDATE Manutencao 
               SET dispositivo_id=?, data=?, descricao=?, custo=?, status=? 
               WHERE id=?`;
  const params = [dispositivo_id, data, descricao, custo, status, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Manutencao não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Manutencao
export const deleteManutencao = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Manutencao WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Manutencao não encontrada' });
    res.json({ message: 'Manutencao deletada com sucesso' });
  });
};
