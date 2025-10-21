import express from 'express';
import {
  getallskills,
  getskillbyid,
  createskill,
  updateskill,
  deleteskill
} from '../controllers/skillcontroller.js';

const router = express.Router();

router.get('/', getallskills);
router.get('/:id', getskillbyid);
router.post('/', createskill);
router.put('/:id', updateskill);
router.delete('/:id', deleteskill);

export default router;
