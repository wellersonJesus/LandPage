// backend/src/routes/CursoRoutes.js
import express from 'express';
import { 
  getAllCursos, getCursoById, createCurso, updateCurso, deleteCurso
} from '../controllers/cursoController.js';

import { verifyToken } from '../utils/authMiddleware.js'; // middleware JWT

const router = express.Router();

router.get('/', verifyToken, getAllCursos);
router.get('/:id', verifyToken, getCursoById);
router.post('/', verifyToken, createCurso);
router.put('/:id', verifyToken, updateCurso);
router.delete('/:id', verifyToken, deleteCurso);

export default router;
