// backend/src/controllers/RedeController.js
import db from '../db/dbConnection.js';

// Listar todas as Redes
export const getAllRedes = (req, res) => {
  db.all('SELECT * FROM Rede', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Rede por ID
export const getRedeById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Rede WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Rede não encontrada' });
    res.json(row);
  });
};

// Criar nova Rede
export const createRede = (req, res) => {
  const { nome, ip, mascara, gateway, dns, status } = req.body;
  const sql = `INSERT INTO Rede (nome, ip, mascara, gateway, dns, status) 
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [nome, ip, mascara, gateway, dns, status];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Rede
export const updateRede = (req, res) => {
  const { id } = req.params;
  const { nome, ip, mascara, gateway, dns, status } = req.body;
  const sql = `UPDATE Rede 
               SET nome=?, ip=?, mascara=?, gateway=?, dns=?, status=? 
               WHERE id=?`;
  const params = [nome, ip, mascara, gateway, dns, status, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Rede não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Rede
export const deleteRede = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Rede WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Rede não encontrada' });
    res.json({ message: 'Rede deletada com sucesso' });
  });
};
