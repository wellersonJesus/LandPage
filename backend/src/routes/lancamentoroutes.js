import express from 'express';
import {
  getalllancamentos,
  getlancamentobyid,
  createlancamento,
  updatelancamento,
  deletelancamento
} from '../controllers/lancamentocontroller.js';

const router = express.Router();

router.get('/', getalllancamentos);
router.get('/:id', getlancamentobyid);
router.post('/', createlancamento);
router.put('/:id', updatelancamento);
router.delete('/:id', deletelancamento);

export default router;
