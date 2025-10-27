import express from 'express';
import { 
  getAllDispositivos, 
  getDispositivoById, 
  createDispositivo, 
  updateDispositivo, 
  deleteDispositivo,
  getContasByDispositivo,       // import do controlador
  createContaByDispositivo      // import do controlador
} from '../controllers/dispositivoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

// Rotas principais de dispositivo
router.get('/', verifyToken, getAllDispositivos);
router.get('/:id', verifyToken, getDispositivoById);
router.post('/', verifyToken, createDispositivo);
router.put('/:id', verifyToken, updateDispositivo);
router.delete('/:id', verifyToken, deleteDispositivo);

// Rotas relacionais de contas
router.get('/:id/contas', verifyToken, getContasByDispositivo);
router.post('/:id/contas', verifyToken, createContaByDispositivo);

export default router;
