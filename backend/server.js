// backend/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { exec } from 'child_process';

// Importar rotas
import empresaRoutes from './src/routes/empresaRoutes.js';
import gestaoRoutes from './src/routes/gestaoRoutes.js';
// import calendarioRoutes from './src/routes/calendarioRoutes.js';
// import emprestimoRoutes from './src/routes/emprestimoRoutes.js';
// import lancamentoRoutes from './src/routes/lancamentoRoutes.js';
// import manutencaoRoutes from './src/routes/manutencaoRoutes.js';
// import contaRoutes from './src/routes/contaRoutes.js';
// import servidorRoutes from './src/routes/servidorRoutes.js';
// import dispositivoRoutes from './src/routes/dispositivoRoutes.js';
// import redeRoutes from './src/routes/redeRoutes.js';
// import contratoRoutes from './src/routes/contratoRoutes.js';
// import skillRoutes from './src/routes/skillRoutes.js';
// import cursoRoutes from './src/routes/cursoRoutes.js';
// import plataformaRoutes from './src/routes/plataformaRoutes.js';
// import investimentoRoutes from './src/routes/investimentoRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rotas
app.use('/api/empresa', empresaRoutes);
app.use('/api/gestao', gestaoRoutes);
// app.use('/api/calendario', calendarioRoutes);
// app.use('/api/emprestimo', emprestimoRoutes);
// app.use('/api/lancamento', lancamentoRoutes);
// app.use('/api/manutencao', manutencaoRoutes);
// app.use('/api/conta', contaRoutes);
// app.use('/api/servidor', servidorRoutes);
// app.use('/api/dispositivo', dispositivoRoutes);
// app.use('/api/rede', redeRoutes);
// app.use('/api/contrato', contratoRoutes);
// app.use('/api/skill', skillRoutes);
// app.use('/api/curso', cursoRoutes);
// app.use('/api/plataforma', plataformaRoutes);
// app.use('/api/investimento', investimentoRoutes);

// Rota raiz para teste
app.get('/', (req, res) => res.send('API WS-Manager online 🚀'));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Porta do Render ou fallback 3000
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando em: ${BASE_URL}`);

  // Abre navegador localmente (só funciona local, não no Render)
  if (process.env.NODE_ENV !== 'production') {
    const platform = process.platform;
    const cmd = platform === 'darwin' ? `open ${BASE_URL}` :
                platform === 'win32' ? `start ${BASE_URL}` : `xdg-open ${BASE_URL}`;
    exec(cmd, (err) => { if (err) console.error('❌ Falha ao abrir navegador:', err); });
  }
});
