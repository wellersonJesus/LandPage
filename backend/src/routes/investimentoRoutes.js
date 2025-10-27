// backend/src/routes/InvestimentoRoutes.js
import express from 'express';
import { 
  getAllInvestimentos, getInvestimentoById, createInvestimento, updateInvestimento, deleteInvestimento
} from '../controllers/investimentoController.js';

const router = express.Router();

router.get('/', getAllInvestimentos);
router.get('/:id', getInvestimentoById);
router.post('/', createInvestimento);
router.put('/:id', updateInvestimento);
router.delete('/:id', deleteInvestimento);

export default router;
