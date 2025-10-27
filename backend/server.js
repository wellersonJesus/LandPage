import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Rotas
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import empresaRoutes from './src/routes/empresaRoutes.js';
import gestaoRoutes from './src/routes/gestaoRoutes.js';
import calendarioRoutes from './src/routes/calendarioRoutes.js';
import emprestimoRoutes from './src/routes/emprestimoRoutes.js';
import lancamentoRoutes from './src/routes/lancamentoRoutes.js';
import manutencaoRoutes from './src/routes/manutencaoRoutes.js';
import contaRoutes from './src/routes/contaRoutes.js';
import servidorRoutes from './src/routes/servidorRoutes.js';
import dispositivoRoutes from './src/routes/dispositivoRoutes.js';
import redeRoutes from './src/routes/redeRoutes.js';
import contratoRoutes from './src/routes/contratoRoutes.js';
import skillRoutes from './src/routes/skillRoutes.js';
import cursoRoutes from './src/routes/cursoRoutes.js';
import plataformaRoutes from './src/routes/plataformaRoutes.js';
import investimentoRoutes from './src/routes/investimentoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega variáveis do .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Verifica se JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET não definido no .env');
  process.exit(1);
}

const app = express();

// --- Middlewares ---
app.use(cors());                     // Habilita CORS
app.use(morgan('dev'));               // Logs HTTP
app.use(express.json());              // Parse JSON
app.use(cookieParser());              // Parse cookies

// --- Rotas da API ---
app.use('/api', usuarioRoutes);
app.use('/api/empresa', empresaRoutes);
app.use('/api/gestao', gestaoRoutes);
app.use('/api/calendario', calendarioRoutes);
app.use('/api/emprestimo', emprestimoRoutes);
app.use('/api/lancamento', lancamentoRoutes);
app.use('/api/manutencao', manutencaoRoutes);
app.use('/api/conta', contaRoutes);
app.use('/api/servidor', servidorRoutes);
app.use('/api/dispositivo', dispositivoRoutes);
app.use('/api/rede', redeRoutes);
app.use('/api/contrato', contratoRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/curso', cursoRoutes);
app.use('/api/plataforma', plataformaRoutes);
app.use('/api/investimento', investimentoRoutes);

// --- Health check ---
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// --- Rota raiz da API ---
app.get('/api', (req, res) =>
  res.json({
    message: 'API WS-Manager rodando',
    endpoints: [
      '/auth', '/empresa', '/gestao', '/calendario', '/emprestimo', '/lancamento', 
      '/manutencao', '/conta', '/servidor', '/dispositivo', '/rede', '/contrato', 
      '/skill', '/curso', '/plataforma', '/investimento'
    ]
  })
);

// --- Tratamento global de erros ---
app.use((err, req, res, next) => {
  console.error('❌ ERRO GLOBAL:', err.stack);
  res.status(500).json({ error: err.message });
});

// --- Inicia o servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta: ${PORT}`);
});
