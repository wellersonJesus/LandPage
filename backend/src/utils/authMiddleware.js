// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware de autenticação via JWT (Bearer Token)
 */
export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1]; // remove "Bearer "
    if (!token) return res.status(401).json({ error: 'Formato de token inválido' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // salva os dados do usuário logado no request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
}
