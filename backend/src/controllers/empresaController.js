// backend/src/controllers/empresaController.js
import db from '../db/dbConnection.js';

// Listar todas as empresas
export const getAllEmpresas = (req, res) => {
  db.all('SELECT * FROM empresa', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Buscar empresa por ID
export const getEmpresaById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM empresa WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Empresa não encontrada' });
    res.json(row);
  });
};

// Criar nova empresa
export const createEmpresa = (req, res) => {
  const { nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque } = req.body;
  const sql = `INSERT INTO empresa (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, ...req.body });
  });
};

// Atualizar empresa
export const updateEmpresa = (req, res) => {
  const { id } = req.params;
  const { nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque } = req.body;
  const sql = `UPDATE empresa 
               SET nome=?, slogan=?, descricao=?, cnpj=?, atividade=?, localizacao=?, missao=?, servicos=?, projetos_destaque=? 
               WHERE id=?`;
  const params = [nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Empresa não encontrada' });
    res.json({ id, ...req.body });
  });
};

// Deletar empresa
export const deleteEmpresa = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM empresa WHERE id=?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Empresa não encontrada' });
    res.json({ message: 'Empresa deletada com sucesso' });
  });
};

// 🔽 Listar todos os contratos de uma empresa
export const getContratosByEmpresa = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM contrato WHERE empresa_id = ?`;
  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// 🔽 Criar novo contrato vinculado a uma empresa
export const createContratoByEmpresa = (req, res) => {
  const { id } = req.params; // empresa_id
  const { descricao, valor, data_inicio, data_fim, status } = req.body;

  const sql = `INSERT INTO contrato (empresa_id, descricao, valor, data_inicio, data_fim, status)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [id, descricao, valor, data_inicio, data_fim, status];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      empresa_id: id,
      descricao,
      valor,
      data_inicio,
      data_fim,
      status
    });
  });
};