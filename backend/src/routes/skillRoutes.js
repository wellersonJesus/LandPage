// backend/src/routes/SkillRoutes.js
import express from 'express';
import { 
  getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill
} from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
