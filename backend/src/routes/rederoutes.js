import express from 'express';
import {
  getallredes,
  getredebyid,
  createrede,
  updaterede,
  deleterede
} from '../controllers/redecontroller.js';

const router = express.Router();

router.get('/', getallredes);
router.get('/:id', getredebyid);
router.post('/', createrede);
router.put('/:id', updaterede);
router.delete('/:id', deleterede);

export default router;
