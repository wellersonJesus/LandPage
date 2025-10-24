// backend/src/controllers/LancamentoController.js
import db from '../db/dbConnection.js';

// Listar todas as Lancamentos
export const getAllLancamentos = (req, res) => {
  db.all('SELECT * FROM Lancamento', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Lancamento por ID
export const getLancamentoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Lancamento WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Lancamento não encontrada' });
    res.json(row);
  });
};

// Criar nova Lancamento
export const createLancamento = (req, res) => {
  const { data, descricao, tipo, valor, categoria, conta_id } = req.body;
  const sql = `INSERT INTO Lancamento (data, descricao, tipo, valor, categoria, conta_id) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [data, descricao, tipo, valor, categoria, conta_id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Lancamento
export const updateLancamento = (req, res) => {
  const { id } = req.params;
  const { data, descricao, tipo, valor, categoria, conta_id } = req.body;
  const sql = `UPDATE Lancamento 
               SET data=?, descricao=?, tipo=?, valor=?, categoria=?, conta_id=? 
               WHERE id=?`;
  const params = [data, descricao, tipo, valor, categoria, conta_id, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Lancamento não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Lancamento
export const deleteLancamento = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Lancamento WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Lancamento não encontrada' });
    res.json({ message: 'Lancamento deletada com sucesso' });
  });
};
