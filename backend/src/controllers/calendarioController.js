// backend/src/controllers/CalendarioController.js
import db from '../db/dbConnection.js';

// Listar todas as Calendarios
export const getAllCalendarios = (req, res) => {
  db.all('SELECT * FROM Calendario', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar Calendario por ID
export const getCalendarioById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM Calendario WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Calendario não encontrada' });
    res.json(row);
  });
};

// Criar nova Calendario
export const createCalendario = (req, res) => {
  const { data, dia_semana, mes, ano, feriado } = req.body;
  const sql = `INSERT INTO Calendario (data, dia_semana, mes, ano, feriado) 
               VALUES (?, ?, ?, ?, ?)`;
  const params = [data, dia_semana, mes, ano, feriado];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar Calendario
export const updateCalendario = (req, res) => {
  const { id } = req.params;
  const { data, dia_semana, mes, ano, feriado } = req.body;
  const sql = `UPDATE calendario 
               SET data=?, dia_semana=?, mes=?, ano=?, feriado=? 
               WHERE id=?`;
  const params = [data, dia_semana, mes, ano, feriado, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Calendario não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar Calendario
export const deleteCalendario = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Calendario WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Calendario não encontrada' });
    res.json({ message: 'Calendario deletada com sucesso' });
  });
};
