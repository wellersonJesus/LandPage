// backend/src/routes/EmprestimoRoutes.js
import express from 'express';
import { 
  getAllEmprestimos, getEmprestimoById, createEmprestimo, updateEmprestimo, deleteEmprestimo
} from '../controllers/emprestimoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllEmprestimos);
router.get('/:id', verifyToken, getEmprestimoById);
router.post('/', verifyToken, createEmprestimo);
router.put('/:id', verifyToken, updateEmprestimo);
router.delete('/:id', verifyToken, deleteEmprestimo);

export default router;
