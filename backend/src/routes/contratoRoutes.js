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

const router = express.Router();

// Rotas CRUD de contratos
router.get('/', getAllContratos);
router.get('/:id', getContratoById);
router.post('/', createContrato);
router.put('/:id', updateContrato);
router.delete('/:id', deleteContrato);

// Subrotas: contas
router.get('/:id/contas', getContasByContrato);
router.post('/:id/contas', createContaByContrato);

// Subrotas: investimentos
router.get('/:id/investimentos', getInvestimentosByContrato);
router.post('/:id/investimentos', createInvestimentoByContrato);

export default router;
