// backend/src/routes/PlataformaRoutes.js
import express from 'express';
import { 
  getAllPlataformas, getPlataformaById, createPlataforma, updatePlataforma, deletePlataforma
} from '../controllers/plataformaController.js';

const router = express.Router();

router.get('/', getAllPlataformas);
router.get('/:id', getPlataformaById);
router.post('/', createPlataforma);
router.put('/:id', updatePlataforma);
router.delete('/:id', deletePlataforma);

export default router;
