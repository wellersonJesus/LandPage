// backend/src/controllers/empresaController.js
import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve(process.env.SQLITE_PATH_LOCAL || './backend/src/db/wsmanager_local.db');
const db = new sqlite3.Database(dbPath);

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
               SET nome = ?, slogan = ?, descricao = ?, cnpj = ?, atividade = ?, localizacao = ?, missao = ?, servicos = ?, projetos_destaque = ?
               WHERE id = ?`;
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
  db.run('DELETE FROM empresa WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Empresa não encontrada' });
    res.json({ message: 'Empresa deletada com sucesso' });
  });
};
