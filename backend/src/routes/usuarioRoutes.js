import express from 'express';
import { createUsuario, listUsuarios, login } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', createUsuario); // Criar usuário
router.get('/usuarios', listUsuarios);   // Listar usuários
router.post('/login', login);            // Login

export default router;



