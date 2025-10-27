import bcrypt from 'bcryptjs';
import db from '../db/dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

// --- Criar usuário ---
export const createUsuario = (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha || !role) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Hash da senha
  const hashedPassword = bcrypt.hashSync(senha, 10);

  const sql = `INSERT INTO usuario (nome, email, senha, role) VALUES (?, ?, ?, ?)`;
  db.run(sql, [nome, email, hashedPassword, role], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, nome, email, role });
  });
};

// --- Listar todos usuários ---
export const listUsuarios = (req, res) => {
  const sql = `SELECT id, nome, email, role FROM usuario`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// --- Função de login (existente) ---
export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email e senha obrigatórios' });

  db.get('SELECT * FROM usuario WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const isMatch = bcrypt.compareSync(password, user.senha);
    if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Login realizado com sucesso', token });
  });
};
