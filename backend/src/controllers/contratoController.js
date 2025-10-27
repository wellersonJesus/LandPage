// backend/src/controllers/ContratoController.js
import db from '../db/dbConnection.js';

// Listar todas as Contratos
export const getAllContratos = (req, res) => {
  db.all('SELECT * FROM Contrato', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Contrato por ID
export const getContratoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Contrato WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Contrato não encontrada' });
    res.json(row);
  });
};

// Criar nova Contrato
export const createContrato = (req, res) => {
  const { empresa_id, descricao, valor, data_inicio, data_fim, status } = req.body;
  const sql = `INSERT INTO Contrato (empresa_id, descricao, valor, data_inicio, data_fim, status) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [empresa_id, descricao, valor, data_inicio, data_fim, status];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Contrato
export const updateContrato = (req, res) => {
  const { id } = req.params;
  const { empresa_id, descricao, valor, data_inicio, data_fim, status } = req.body;
  const sql = `UPDATE Contrato 
               SET empresa_id=?, descricao=?, valor=?, data_inicio=?, data_fim=?, status=? 
               WHERE id=?`;
  const params = [empresa_id, descricao, valor, data_inicio, data_fim, status, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Contrato não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Contrato
export const deleteContrato = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Contrato WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Contrato não encontrada' });
    res.json({ message: 'Contrato deletada com sucesso' });
  });
};
