import express from 'express';
import {
  getallplataformas,
  getplataformabyid,
  createplataforma,
  updateplataforma,
  deleteplataforma
} from '../controllers/plataformacontroller.js';

const router = express.Router();

router.get('/', getallplataformas);
router.get('/:id', getplataformabyid);
router.post('/', createplataforma);
router.put('/:id', updateplataforma);
router.delete('/:id', deleteplataforma);

export default router;
