// backend/src/controllers/EmprestimoController.js
import db from '../db/dbConnection.js';

// Listar todas as Emprestimos
export const getAllEmprestimos = (req, res) => {
  db.all('SELECT * FROM Emprestimo', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Emprestimo por ID
export const getEmprestimoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Emprestimo WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Emprestimo não encontrada' });
    res.json(row);
  });
};

// Criar novo Empréstimo
export const createEmprestimo = (req, res) => {
  const { cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela} = req.body;
  const sql = `
    INSERT INTO Emprestimo (
      cnpj, descricao, valor_total, valor_pago, valor_a_pagar,
      data_parcela, numero_parcela, valor_parcela
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Empréstimo
export const updateEmprestimo = (req, res) => {
  const { id } = req.params;
  const { cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela } = req.body;
  const sql = `UPDATE emprestimo 
               SET cnpj = ?, descricao = ?, valor_total = ?, valor_pago = ?, valor_a_pagar = ?, data_parcela = ?, numero_parcela = ?, valor_parcela = ?
               WHERE id=?`;
  const params = [cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Emprestimo não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Emprestimo
export const deleteEmprestimo = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Emprestimo WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Emprestimo não encontrada' });
    res.json({ message: 'Emprestimo deletada com sucesso' });
  });
};
