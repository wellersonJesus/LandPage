import express from 'express';
import {
  getallinvestimentos,
  getinvestimentobyid,
  createinvestimento,
  updateinvestimento,
  deleteinvestimento
} from '../controllers/investimentocontroller.js';

const router = express.Router();

router.get('/', getallinvestimentos);
router.get('/:id', getinvestimentobyid);
router.post('/', createinvestimento);
router.put('/:id', updateinvestimento);
router.delete('/:id', deleteinvestimento);

export default router;
