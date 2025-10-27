// backend/src/routes/DispositivoRoutes.js
import express from 'express';
import { 
  getAllDispositivos, getDispositivoById, createDispositivo, updateDispositivo, deleteDispositivo
} from '../controllers/dispositivoController.js';

const router = express.Router();

router.get('/', getAllDispositivos);
router.get('/:id', getDispositivoById);
router.post('/', createDispositivo);
router.put('/:id', updateDispositivo);
router.delete('/:id', deleteDispositivo);

export default router;
