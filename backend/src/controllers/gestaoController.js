// backend/src/controllers/gestaoController.js
import db from '../db/dbConnection.js';

// Listar todas as gestões
export const getAllGestao = (req, res) => {
  db.all('SELECT * FROM gestao', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar gestão por ID
export const getGestaoById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM gestao WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Gestão não encontrada' });
    res.json(row);
  });
};

// Criar nova gestão
export const createGestao = (req, res) => {
  const { data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id } = req.body;
  const sql = `INSERT INTO gestao (data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar gestão
export const updateGestao = (req, res) => {
  const { id } = req.params;
  const { data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id } = req.body;
  const sql = `UPDATE gestao 
               SET data=?, km_percorrido=?, meta=?, horas_trabalhadas=?, receita=?, despesa=?, lucro=?, conta_id=? 
               WHERE id=?`;
  const params = [data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Gestão não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar gestão
export const deleteGestao = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM gestao WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Gestão não encontrada' });
    res.json({ message: 'Gestão deletada com sucesso' });
  });
};

// 🔹 Listar lançamentos vinculados a uma gestão específica
export const getLancamentosByGestao = (req, res) => {
  const { id } = req.params; // id da gestão
  const sql = `SELECT * FROM lancamento WHERE gestao_id = ?`;
  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ message: 'Nenhum lançamento encontrado para esta gestão' });
    res.json(rows);
  });
};

// 🔹 Criar lançamento vinculado à gestão
export const createLancamentoByGestao = (req, res) => {
  const { id } = req.params; // gestao_id
  const { tipo, descricao, valor, data, categoria } = req.body;

  const sql = `INSERT INTO lancamento (gestao_id, tipo, descricao, valor, data, categoria)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [id, tipo, descricao, valor, data, categoria];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      gestao_id: id,
      tipo,
      descricao,
      valor,
      data,
      categoria
    });
  });
};
