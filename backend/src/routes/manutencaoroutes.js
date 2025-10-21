import express from 'express';
import {
  getallmanutencaos,
  getmanutencaobyid,
  createmanutencao,
  updatemanutencao,
  deletemanutencao
} from '../controllers/manutencaocontroller.js';

const router = express.Router();

router.get('/', getallmanutencaos);
router.get('/:id', getmanutencaobyid);
router.post('/', createmanutencao);
router.put('/:id', updatemanutencao);
router.delete('/:id', deletemanutencao);

export default router;
