// backend/src/routes/ServidorRoutes.js
import express from 'express';
import { 
  getAllServidors, getServidorById, createServidor, updateServidor, deleteServidor
} from '../controllers/servidorController.js';

const router = express.Router();

router.get('/', getAllServidors);
router.get('/:id', getServidorById);
router.post('/', createServidor);
router.put('/:id', updateServidor);
router.delete('/:id', deleteServidor);

export default router;
