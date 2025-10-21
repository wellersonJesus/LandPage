// backend/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { KEYS } from './src/utils/keys.js';

// Importar todas as rotas
import empresaRoutes from './src/routes/empresaroutes.js';
import gestaoRoutes from './src/routes/Gestaoroutes.js';
import calendarioRoutes from './src/routes/calendarioroutes.js';
import emprestimoRoutes from './src/routes/emprestimoroutes.js';
import lancamentoRoutes from './src/routes/lancamentoroutes.js';
import manutencaoRoutes from './src/routes/manutencaoroutes.js';
import contaRoutes from './src/routes/contaroutes.js';
import servidorRoutes from './src/routes/servidorroutes.js';
import dispositivoRoutes from './src/routes/dispositivoroutes.js';
import redeRoutes from './src/routes/rederoutes.js';
import contratoRoutes from './src/routes/contratoroutes.js';
import skillRoutes from './src/routes/skillroutes.js';
import cursoRoutes from './src/routes/cursoroutes.js';
import plataformaRoutes from './src/routes/plataformaroutes.js';
import investimentoRoutes from './src/routes/investimentoroutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Registro das rotas
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

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = KEYS.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));
