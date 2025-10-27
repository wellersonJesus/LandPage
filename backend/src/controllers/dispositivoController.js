// backend/src/controllers/DispositivoController.js
import db from '../db/dbConnection.js';

// Listar todas as Dispositivos
export const getAllDispositivos = (req, res) => {
  db.all('SELECT * FROM Dispositivo', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Dispositivo por ID
export const getDispositivoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Dispositivo WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Dispositivo não encontrada' });
    res.json(row);
  });
};

// Criar nova Dispositivo
export const createDispositivo = (req, res) => {
  const { nome, tipo, marca, modelo, numero_serie, status } = req.body;
  const sql = `INSERT INTO Dispositivo (nome, tipo, marca, modelo, numero_serie, status) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [nome, tipo, marca, modelo, numero_serie, status];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Dispositivo
export const updateDispositivo = (req, res) => {
  const { id } = req.params;
  const { nome, tipo, marca, modelo, numero_serie, status } = req.body;
  const sql = `UPDATE Dispositivo 
               SET nome=?, tipo=?, marca=?, modelo=?, numero_serie=?, status=? 
               WHERE id=?`;
  const params = [nome, tipo, marca, modelo, numero_serie, status, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Dispositivo não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Dispositivo
export const deleteDispositivo = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Dispositivo WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Dispositivo não encontrada' });
    res.json({ message: 'Dispositivo deletada com sucesso' });
  });
};

// Listar todas as contas de um dispositivo
export const getContasByDispositivo = (req, res) => {
  const { id } = req.params; // dispositivo_id
  const sql = `SELECT * FROM conta WHERE dispositivo_id = ?`;
  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Criar conta vinculada a um dispositivo
export const createContaByDispositivo = (req, res) => {
  const { id } = req.params; // dispositivo_id
  const { nome, banco, tipo, saldo, agencia, numero_conta, contrato_id } = req.body;

  const sql = `INSERT INTO conta (nome, banco, tipo, saldo, agencia, numero_conta, contrato_id, dispositivo_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [nome, banco, tipo, saldo, agencia, numero_conta, contrato_id, id];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      dispositivo_id: id,
      nome,
      banco,
      tipo,
      saldo,
      agencia,
      numero_conta,
      contrato_id
    });
  });
};
