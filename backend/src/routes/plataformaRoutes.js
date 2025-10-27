// backend/src/routes/PlataformaRoutes.js
import express from 'express';
import { 
  getAllPlataformas, getPlataformaById, createPlataforma, updatePlataforma, deletePlataforma
} from '../controllers/plataformaController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllPlataformas);
router.get('/:id', verifyToken, getPlataformaById);
router.post('/', verifyToken, createPlataforma);
router.put('/:id', verifyToken, updatePlataforma);
router.delete('/:id', verifyToken, deletePlataforma);

export default router;
