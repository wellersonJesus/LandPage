// backend/src/routes/CursoRoutes.js
import express from 'express';
import { 
  getAllCursos, getCursoById, createCurso, updateCurso, deleteCurso
} from '../controllers/cursoController.js';

const router = express.Router();

router.get('/', getAllCursos);
router.get('/:id', getCursoById);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

export default router;
