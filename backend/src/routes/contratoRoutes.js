// backend/src/routes/contratoRoutes.js
import express from 'express';
import { 
  getAllContratos,
  getContratoById,
  createContrato,
  updateContrato,
  deleteContrato,
  getContasByContrato,
  createContaByContrato,
  getInvestimentosByContrato,
  createInvestimentoByContrato
} from '../controllers/contratoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

// Rotas CRUD de contratos
router.get('/', verifyToken, getAllContratos);
router.get('/:id', verifyToken, getContratoById);
router.post('/', verifyToken, createContrato);
router.put('/:id', verifyToken, updateContrato);
router.delete('/:id', verifyToken, deleteContrato);

// Subrotas: contas
router.get('/:id/contas', verifyToken, getContasByContrato);
router.post('/:id/contas', verifyToken, createContaByContrato);

// Subrotas: investimentos
router.get('/:id/investimentos', verifyToken, getInvestimentosByContrato);
router.post('/:id/investimentos', verifyToken, createInvestimentoByContrato);

export default router;
