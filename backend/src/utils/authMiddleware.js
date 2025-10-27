import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  // lê do cookie ou header Authorization
  const token = req.cookies?.[process.env.JWT_COOKIE_NAME] || req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
};
