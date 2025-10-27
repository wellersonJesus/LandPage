// backend/src/routes/ContaRoutes.js
import express from 'express';
import { 
  getAllContas, getContaById, createConta, updateConta, deleteConta
} from '../controllers/contaController.js';

const router = express.Router();

router.get('/', getAllContas);
router.get('/:id', getContaById);
router.post('/', createConta);
router.put('/:id', updateConta);
router.delete('/:id', deleteConta);

export default router;
