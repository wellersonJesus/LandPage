// backend/src/routes/ManutencaoRoutes.js
import express from 'express';
import { 
  getAllManutencaos, getManutencaoById, createManutencao, updateManutencao, deleteManutencao
} from '../controllers/manutencaoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllManutencaos);
router.get('/:id', verifyToken, getManutencaoById);
router.post('/', verifyToken, createManutencao);
router.put('/:id', verifyToken, updateManutencao);
router.delete('/:id', verifyToken, deleteManutencao);

export default router;
