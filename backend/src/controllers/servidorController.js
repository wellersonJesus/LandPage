// backend/src/controllers/ServidorController.js
import db from '../db/dbConnection.js';

// Listar todas as Servidors
export const getAllServidors = (req, res) => {
  db.all('SELECT * FROM Servidor', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Servidor por ID
export const getServidorById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Servidor WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Servidor não encontrada' });
    res.json(row);
  });
};

// Criar nova Servidor
export const createServidor = (req, res) => {
  const {  nome, ip, sistema_operacional, status, localizacao } = req.body;
  const sql = `INSERT INTO Servidor ( nome, ip, sistema_operacional, status, localizacao) 
               VALUES (?, ?, ?, ?, ?)`;
  const params = [ nome, ip, sistema_operacional, status, localizacao];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Servidor
export const updateServidor = (req, res) => {
  const { id } = req.params;
  const {  nome, ip, sistema_operacional, status, localizacao } = req.body;
  const sql = `UPDATE Servidor 
               SET nome=?, ip=?, sistema_operacional=?, status=?, localizacao=? 
               WHERE id=?`;
  const params = [nome, ip, sistema_operacional, status, localizacao, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Servidor não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Servidor
export const deleteServidor = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Servidor WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Servidor não encontrada' });
    res.json({ message: 'Servidor deletada com sucesso' });
  });
};
