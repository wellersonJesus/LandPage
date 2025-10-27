// backend/src/controllers/InvestimentoController.js
import db from '../db/dbConnection.js';

// Listar todas as Investimentos
export const getAllInvestimentos = (req, res) => {
  db.all('SELECT * FROM Investimento', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Investimento por ID
export const getInvestimentoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Investimento WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Investimento não encontrada' });
    res.json(row);
  });
};

// Criar nova Investimento
export const createInvestimento = (req, res) => {
  const { tipo, descricao, valor_aplicado, rendimento, data_aplicacao } = req.body;
  const sql = `INSERT INTO Investimento (tipo, descricao, valor_aplicado, rendimento, data_aplicacao) 
               VALUES (?, ?, ?, ?, ?)`;
  const params = [tipo, descricao, valor_aplicado, rendimento, data_aplicacao];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Investimento
export const updateInvestimento = (req, res) => {
  const { id } = req.params;
  const { tipo, descricao, valor_aplicado, rendimento, data_aplicacao } = req.body;
  const sql = `UPDATE Investimento 
               SET tipo=?, descricao=?, valor_aplicado=?, rendimento=?, data_aplicacao=?  
               WHERE id=?`;
  const params = [tipo, descricao, valor_aplicado, rendimento, data_aplicacao, id];
  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Investimento não encontrado' });
    res.json({ id, ...req.body });
  });
};

// Deletar Investimento
export const deleteInvestimento = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Investimento WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Investimento não encontrada' });
    res.json({ message: 'Investimento deletada com sucesso' });
  });
};
