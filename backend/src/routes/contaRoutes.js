// backend/src/routes/ContaRoutes.js
import express from 'express';
import { 
  getAllContas, getContaById, createConta, updateConta, deleteConta
} from '../controllers/contaController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllContas);
router.get('/:id', verifyToken, getContaById);
router.post('/', verifyToken, createConta);
router.put('/:id', verifyToken, updateConta);
router.delete('/:id', verifyToken, deleteConta);

export default router;


