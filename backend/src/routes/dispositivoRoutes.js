import express from 'express';
import { 
  getAllDispositivos, 
  getDispositivoById, 
  createDispositivo, 
  updateDispositivo, 
  deleteDispositivo,
  getContasByDispositivo,       // import do controlador
  createContaByDispositivo      // import do controlador
} from '../controllers/dispositivoController.js';

const router = express.Router();

// Rotas principais de dispositivo
router.get('/', getAllDispositivos);
router.get('/:id', getDispositivoById);
router.post('/', createDispositivo);
router.put('/:id', updateDispositivo);
router.delete('/:id', deleteDispositivo);

// Rotas relacionais de contas
router.get('/:id/contas', getContasByDispositivo);
router.post('/:id/contas', createContaByDispositivo);

export default router;
