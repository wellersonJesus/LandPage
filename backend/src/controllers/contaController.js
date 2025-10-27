// backend/src/controllers/ContaController.js
import db from '../db/dbConnection.js';

// Listar todas as Contas
export const getAllContas = (req, res) => {
  db.all('SELECT * FROM Conta', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Conta por ID
export const getContaById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Conta WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Conta não encontrada' });
    res.json(row);
  });
};

// Criar nova Conta
export const createConta = (req, res) => {
  const {  nome, banco, tipo, saldo, agencia, numero_conta } = req.body;
  const sql = `INSERT INTO Conta ( nome, banco, tipo, saldo, agencia, numero_conta) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [ nome, banco, tipo, saldo, agencia, numero_conta];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Conta
export const updateConta = (req, res) => {
  const { id } = req.params;
  const {  nome, banco, tipo, saldo, agencia, numero_conta } = req.body;
  const sql = `UPDATE Conta 
               SET nome=?, banco=?, tipo=?, saldo=?, agencia=?, numero_conta=? 
               WHERE id=?`;
  const params = [nome, banco, tipo, saldo, agencia, numero_conta, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Conta não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Conta
export const deleteConta = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Conta WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Conta não encontrada' });
    res.json({ message: 'Conta deletada com sucesso' });
  });
};
