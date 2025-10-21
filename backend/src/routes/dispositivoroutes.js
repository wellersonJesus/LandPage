import express from 'express';
import {
  getalldispositivos,
  getdispositivobyid,
  createdispositivo,
  updatedispositivo,
  deletedispositivo
} from '../controllers/dispositivocontroller.js';

const router = express.Router();

router.get('/', getalldispositivos);
router.get('/:id', getdispositivobyid);
router.post('/', createdispositivo);
router.put('/:id', updatedispositivo);
router.delete('/:id', deletedispositivo);

export default router;
