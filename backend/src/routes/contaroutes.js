import express from 'express';
import {
  getallcontas,
  getcontabyid,
  createconta,
  updateconta,
  deleteconta
} from '../controllers/contacontroller.js';

const router = express.Router();

router.get('/', getallcontas);
router.get('/:id', getcontabyid);
router.post('/', createconta);
router.put('/:id', updateconta);
router.delete('/:id', deleteconta);

export default router;
