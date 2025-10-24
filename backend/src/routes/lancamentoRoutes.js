// backend/src/routes/LancamentoRoutes.js
import express from 'express';
import { 
  getAllLancamentos, getLancamentoById, createLancamento, updateLancamento, deleteLancamento
} from '../controllers/lancamentoController.js';

const router = express.Router();

router.get('/', getAllLancamentos);
router.get('/:id', getLancamentoById);
router.post('/', createLancamento);
router.put('/:id', updateLancamento);
router.delete('/:id', deleteLancamento);

export default router;
