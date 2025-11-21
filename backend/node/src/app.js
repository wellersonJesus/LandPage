require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

// Dev-only: definir CSP permissivo para evitar bloqueios no devtools / extensões
app.use((req, res, next) => {
  // permitir fontes próprias e conexões XHR/WebSocket para localhost
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' data:; connect-src 'self' http://localhost:4200 http://localhost:3000 ws://localhost:4200; img-src 'self' data:;"
  );
  next();
});

app.use(bodyParser.json());

const BUSINESS_USER = process.env.BUSINESS_USER || 'business';
const BUSINESS_PASS = process.env.BUSINESS_PASS || 'business123';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// rota de login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === BUSINESS_USER && password === BUSINESS_PASS) {
    const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '4h' });
    return res.json({ ok: true, token });
  }
  return res.status(401).json({ ok: false, message: 'Usuário ou senha incorretos' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Auth server running on ${port}`));