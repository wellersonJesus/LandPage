import express from 'express';
import {
  getallcalendarios,
  getcalendariobyid,
  createcalendario,
  updatecalendario,
  deletecalendario
} from '../controllers/calendariocontroller.js';

const router = express.Router();

router.get('/', getallcalendarios);
router.get('/:id', getcalendariobyid);
router.post('/', createcalendario);
router.put('/:id', updatecalendario);
router.delete('/:id', deletecalendario);

export default router;
