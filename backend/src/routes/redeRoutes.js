// backend/src/routes/RedeRoutes.js
import express from 'express';
import { 
  getAllRedes, getRedeById, createRede, updateRede, deleteRede
} from '../controllers/redeController.js';

const router = express.Router();

router.get('/', getAllRedes);
router.get('/:id', getRedeById);
router.post('/', createRede);
router.put('/:id', updateRede);
router.delete('/:id', deleteRede);

export default router;
