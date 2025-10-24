import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import empresaRoutes from './src/routes/empresaRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/empresa', empresaRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando em: ${BASE_URL}`);
  const platform = process.platform;
  const cmd = platform === 'darwin' ? `open ${BASE_URL}` :
              platform === 'win32' ? `start ${BASE_URL}` : `xdg-open ${BASE_URL}`;
  exec(cmd, (err) => { if (err) console.error('❌ Falha ao abrir navegador:', err); });
});
