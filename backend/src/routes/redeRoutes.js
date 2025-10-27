// backend/src/routes/RedeRoutes.js
import express from 'express';
import { 
  getAllRedes, getRedeById, createRede, updateRede, deleteRede
} from '../controllers/redeController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllRedes);
router.get('/:id', verifyToken, getRedeById);
router.post('/', verifyToken, createRede);
router.put('/:id', verifyToken, updateRede);
router.delete('/:id', verifyToken, deleteRede);

export default router;
