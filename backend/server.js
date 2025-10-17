require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const app = express();
const authRoutes = require('./src/routes/authRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`🌐 Servidor backend rodando em: ${BASE_URL}`);

  // Detecta SO e abre URL corretamente
  const platform = process.platform;
  const cmd =
    platform === 'darwin'
      ? `open ${BASE_URL}`
      : platform === 'win32'
      ? `start ${BASE_URL}`
      : `xdg-open ${BASE_URL}`;
  
  exec(cmd, (err) => {
    if (err) console.error('❌ Falha ao abrir o navegador:', err);
  });
});
