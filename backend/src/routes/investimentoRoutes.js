// backend/src/routes/InvestimentoRoutes.js
import express from 'express';
import { 
  getAllInvestimentos, getInvestimentoById, createInvestimento, updateInvestimento, deleteInvestimento
} from '../controllers/investimentoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllInvestimentos);
router.get('/:id', verifyToken, getInvestimentoById);
router.post('/', verifyToken, createInvestimento);
router.put('/:id', verifyToken, updateInvestimento);
router.delete('/:id', verifyToken, deleteInvestimento);

export default router;
