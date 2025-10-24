// backend/src/routes/gestaoRoutes.js
import express from 'express';
import { 
  getAllGestao, getGestaoById, createGestao, updateGestao, deleteGestao
} from '../controllers/gestaoController.js';

const router = express.Router();

router.get('/', getAllGestao);
router.get('/:id', getGestaoById);
router.post('/', createGestao);
router.put('/:id', updateGestao);
router.delete('/:id', deleteGestao);

export default router;
