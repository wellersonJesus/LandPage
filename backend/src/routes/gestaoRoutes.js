import express from 'express';
import {
  getAllGestao,
  getGestaoById,
  createGestao,
  updateGestao,
  deleteGestao,
  getLancamentosByGestao,
  createLancamentoByGestao
} from '../controllers/gestaoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

// Rotas principais
router.get('/', verifyToken, getAllGestao);
router.get('/:id', verifyToken, getGestaoById);
router.post('/', verifyToken, createGestao);
router.put('/:id', verifyToken, updateGestao);
router.delete('/:id', verifyToken, deleteGestao);

// 🔹 Rotas relacionais (Gestão -> Lançamentos)
router.get('/:id/lancamentos', verifyToken, getLancamentosByGestao);
router.post('/:id/lancamentos', verifyToken, createLancamentoByGestao);

export default router;
