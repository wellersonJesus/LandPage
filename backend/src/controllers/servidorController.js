// backend/src/controllers/RedeController.js
import db from '../db/dbConnection.js';

// Listar todas as Servidors
export const getAllServidores = (req, res) => {
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

// Listar todas as plataformas de um servidor
export const getPlataformasByServidor = (req, res) => {
  const { id } = req.params; // servidor_id
  const sql = `
    SELECT p.* 
    FROM plataforma p
    JOIN servidor_plataforma sp ON p.id = sp.plataforma_id
    WHERE sp.servidor_id = ?
  `;
  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Vincular uma plataforma a um servidor
export const createPlataformaByServidor = (req, res) => {
  const { id } = req.params; // servidor_id
  const { plataforma_id } = req.body;

  const sql = `INSERT INTO servidor_plataforma (servidor_id, plataforma_id) VALUES (?, ?)`;
  db.run(sql, [id, plataforma_id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, servidor_id: id, plataforma_id });
  });
};
