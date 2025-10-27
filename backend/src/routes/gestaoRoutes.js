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

const router = express.Router();

// Rotas principais
router.get('/', getAllGestao);
router.get('/:id', getGestaoById);
router.post('/', createGestao);
router.put('/:id', updateGestao);
router.delete('/:id', deleteGestao);

// 🔹 Rotas relacionais (Gestão -> Lançamentos)
router.get('/:id/lancamentos', getLancamentosByGestao);
router.post('/:id/lancamentos', createLancamentoByGestao);

export default router;
