// backend/src/routes/calendarioRoutes.js
import express from 'express';
import { 
  getAllCalendarios, 
  getCalendarioById, 
  createCalendario, 
  updateCalendario, 
  deleteCalendario 
} from '../controllers/calendarioController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

// 🔒 Rotas protegidas
router.get('/', verifyToken, getAllCalendarios);
router.get('/:id', verifyToken, getCalendarioById);
router.post('/', verifyToken, createCalendario);
router.put('/:id', verifyToken, updateCalendario);
router.delete('/:id', verifyToken, deleteCalendario);

export default router;
