import express from 'express';
import { 
  getAllEmpresas, 
  getEmpresaById, 
  createEmpresa, 
  updateEmpresa, 
  deleteEmpresa,
  getContratosByEmpresa,
  createContratoByEmpresa
} from '../controllers/empresaController.js';

const router = express.Router();

// Rotas de empresa
router.get('/', getAllEmpresas);
router.get('/:id', getEmpresaById);
router.post('/', createEmpresa);
router.put('/:id', updateEmpresa);
router.delete('/:id', deleteEmpresa);

// Rotas de contratos vinculadas à empresa
router.get('/:id/contratos', getContratosByEmpresa);
router.post('/:id/contratos', createContratoByEmpresa);

export default router;
