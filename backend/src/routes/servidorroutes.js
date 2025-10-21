import express from 'express';
import {
  getallservidors,
  getservidorbyid,
  createservidor,
  updateservidor,
  deleteservidor
} from '../controllers/servidorcontroller.js';

const router = express.Router();

router.get('/', getallservidors);
router.get('/:id', getservidorbyid);
router.post('/', createservidor);
router.put('/:id', updateservidor);
router.delete('/:id', deleteservidor);

export default router;
