// backend/src/routes/ManutencaoRoutes.js
import express from 'express';
import { 
  getAllManutencaos, getManutencaoById, createManutencao, updateManutencao, deleteManutencao
} from '../controllers/manutencaoController.js';

const router = express.Router();

router.get('/', getAllManutencaos);
router.get('/:id', getManutencaoById);
router.post('/', createManutencao);
router.put('/:id', updateManutencao);
router.delete('/:id', deleteManutencao);

export default router;
