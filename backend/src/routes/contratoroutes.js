import express from 'express';
import {
  getallcontratos,
  getcontratobyid,
  createcontrato,
  updatecontrato,
  deletecontrato
} from '../controllers/contratocontroller.js';

const router = express.Router();

router.get('/', getallcontratos);
router.get('/:id', getcontratobyid);
router.post('/', createcontrato);
router.put('/:id', updatecontrato);
router.delete('/:id', deletecontrato);

export default router;
