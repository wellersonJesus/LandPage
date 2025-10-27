import express from 'express';
import { 
  getAllServidores,
  getServidorById,
  createServidor,
  updateServidor,
  deleteServidor,
  getPlataformasByServidor,
  createPlataformaByServidor
} from '../controllers/servidorController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

// Rotas padrão
router.get('/', verifyToken, getAllServidores);
router.get('/:id', verifyToken, getServidorById);
router.post('/', verifyToken, createServidor);
router.put('/:id', verifyToken, updateServidor);
router.delete('/:id', verifyToken, deleteServidor);

// Rotas relacionais
router.get('/:id/plataformas', verifyToken, getPlataformasByServidor);
router.post('/:id/plataformas', verifyToken, createPlataformaByServidor);

export default router;
