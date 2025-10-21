import express from 'express';
import {
  getallcursos,
  getcursobyid,
  createcurso,
  updatecurso,
  deletecurso
} from '../controllers/cursocontroller.js';

const router = express.Router();

router.get('/', getallcursos);
router.get('/:id', getcursobyid);
router.post('/', createcurso);
router.put('/:id', updatecurso);
router.delete('/:id', deletecurso);

export default router;
