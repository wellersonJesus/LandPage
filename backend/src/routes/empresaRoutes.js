// backend/src/routes/empresaRoutes.js
import express from 'express';
import { 
  getAllEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa
} from '../controllers/empresaController.js';

const router = express.Router();

router.get('/', getAllEmpresas);
router.get('/:id', getEmpresaById);
router.post('/', createEmpresa);
router.put('/:id', updateEmpresa);
router.delete('/:id', deleteEmpresa);

export default router;
