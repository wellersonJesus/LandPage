// backend/src/routes/LancamentoRoutes.js
import express from 'express';
import { 
  getAllLancamentos, getLancamentoById, createLancamento, updateLancamento, deleteLancamento
} from '../controllers/lancamentoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllLancamentos);
router.get('/:id', verifyToken, getLancamentoById);
router.post('/', verifyToken, createLancamento);
router.put('/:id', verifyToken, updateLancamento);
router.delete('/:id', verifyToken, deleteLancamento);

export default router;
