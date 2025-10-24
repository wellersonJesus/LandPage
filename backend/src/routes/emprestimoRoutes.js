// backend/src/routes/EmprestimoRoutes.js
import express from 'express';
import { 
  getAllEmprestimos, getEmprestimoById, createEmprestimo, updateEmprestimo, deleteEmprestimo
} from '../controllers/emprestimoController.js';

const router = express.Router();

router.get('/', getAllEmprestimos);
router.get('/:id', getEmprestimoById);
router.post('/', createEmprestimo);
router.put('/:id', updateEmprestimo);
router.delete('/:id', deleteEmprestimo);

export default router;
