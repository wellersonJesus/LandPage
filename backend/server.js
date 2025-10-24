import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { exec } from 'child_process';

const app = express();

app.use(express.json());

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
