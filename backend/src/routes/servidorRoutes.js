import express from 'express';
import { 
  getAllServidores,
  getServidorById,
  createServidor,
  updateServidor,
  deleteServidor,
  getPlataformasByServidor,
  createPlataformaByServidor
} from '../controllers/servidorController.js';

const router = express.Router();

// Rotas padrão
router.get('/', getAllServidores);
router.get('/:id', getServidorById);
router.post('/', createServidor);
router.put('/:id', updateServidor);
router.delete('/:id', deleteServidor);

// Rotas relacionais
router.get('/:id/plataformas', getPlataformasByServidor);
router.post('/:id/plataformas', createPlataformaByServidor);

export default router;
