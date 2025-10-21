import express from 'express';
import {
  getallemprestimos,
  getemprestimobyid,
  createemprestimo,
  updateemprestimo,
  deleteemprestimo
} from '../controllers/emprestimocontroller.js';

const router = express.Router();

router.get('/', getallemprestimos);
router.get('/:id', getemprestimobyid);
router.post('/', createemprestimo);
router.put('/:id', updateemprestimo);
router.delete('/:id', deleteemprestimo);

export default router;
