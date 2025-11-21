<?php

use App\Controllers\CursoController;
use App\Middleware\AuthMiddleware;

// Middleware JWT
$auth = new AuthMiddleware();

// Controller
$controller = new CursoController();

/**
 * Rotas CRUD de Cursos
 */
$router->get('/cursos', [$auth, 'verifyToken'], [$controller, 'getAllCursos']);
$router->get('/cursos/{id}', [$auth, 'verifyToken'], [$controller, 'getCursoById']);
$router->post('/cursos', [$auth, 'verifyToken'], [$controller, 'createCurso']);
$router->put('/cursos/{id}', [$auth, 'verifyToken'], [$controller, 'updateCurso']);
$router->delete('/cursos/{id}', [$auth, 'verifyToken'], [$controller, 'deleteCurso']);
