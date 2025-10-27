import express from 'express';
import { createUsuario, listUsuarios } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', createUsuario); // criar usuário
router.get('/usuarios', listUsuarios);   // listar usuários

export default router;
