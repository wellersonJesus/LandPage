// backend/src/routes/CalendarioRoutes.js
import express from 'express';
import { 
  getAllCalendarios, getCalendarioById, createCalendario, updateCalendario, deleteCalendario
} from '../controllers/calendarioController.js';

const router = express.Router();

router.get('/', getAllCalendarios);
router.get('/:id', getCalendarioById);
router.post('/', createCalendario);
router.put('/:id', updateCalendario);
router.delete('/:id', deleteCalendario);

export default router;
