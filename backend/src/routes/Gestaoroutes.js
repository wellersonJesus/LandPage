import express from 'express';
import {
  getallgestaos,
  getgestaobyid,
  creategestao,
  updategestao,
  deletegestao
} from '../controllers/gestaocontroller.js';

const router = express.Router();

router.get('/', getallgestaos);
router.get('/:id', getgestaobyid);
router.post('/', creategestao);
router.put('/:id', updategestao);
router.delete('/:id', deletegestao);

export default router;
