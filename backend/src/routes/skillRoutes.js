// backend/src/routes/SkillRoutes.js
import express from 'express';
import { 
  getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill
} from '../controllers/skillController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllSkills);
router.get('/:id', verifyToken, getSkillById);
router.post('/', verifyToken, createSkill);
router.put('/:id', verifyToken, updateSkill);
router.delete('/:id', verifyToken, deleteSkill);

export default router;
