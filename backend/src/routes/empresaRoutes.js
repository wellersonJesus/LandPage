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

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

// Rotas de empresa
router.get('/', verifyToken, getAllEmpresas);
router.get('/:id', verifyToken, getEmpresaById);
router.post('/', verifyToken, createEmpresa);
router.put('/:id', verifyToken, updateEmpresa);
router.delete('/:id', verifyToken, deleteEmpresa);

// Rotas de contratos vinculadas à empresa
router.get('/:id/contratos', verifyToken, getContratosByEmpresa);
router.post('/:id/contratos', verifyToken, createContratoByEmpresa);

export default router;
