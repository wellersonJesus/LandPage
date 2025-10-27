import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db/dbConnection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega .env da raiz
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Debug
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// --- Criar usuário ---
export const createUsuario = (req, res) => {
  const { nome, email, senha, role } = req.body;
  const finalSenha = senha || (role === 'admin' ? process.env.ADMIN_PASSWORD : process.env.USER_PASSWORD);

  if (!nome || !email || !finalSenha || !role) 
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

  const hashedPassword = bcrypt.hashSync(finalSenha, 10);

  db.run(
    `INSERT INTO usuario (nome, email, senha, role) VALUES (?, ?, ?, ?)`,
    [nome, email, hashedPassword, role],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, nome, email, role });
    }
  );
};

// --- Listar usuários ---
export const listUsuarios = (req, res) => {
  db.all(`SELECT id, nome, email, role FROM usuario`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// --- Login ---
export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email e senha obrigatórios' });

  db.get('SELECT * FROM usuario WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const isMatch = bcrypt.compareSync(password, user.senha);
    if (!isMatch) return res.status(401).json({ error: 'Senha incorreta' });

    if (!process.env.JWT_SECRET) return res.status(500).json({ error: 'JWT_SECRET não definido' });

    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.cookie(process.env.JWT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000
    });

    res.json({ message: 'Login realizado com sucesso', token: 'Bearer ' + token });
  });
};
