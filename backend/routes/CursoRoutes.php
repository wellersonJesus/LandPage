<?php

use App\Controllers\CursoController;
use App\Middleware\AuthMiddleware;

// Middleware
$auth = new AuthMiddleware();

// Controller (PDO vem do index)
$controller = new CursoController($pdo);

$router->get('/cursos', [$auth, 'verifyToken'], [$controller, 'index']);
$router->get('/cursos/{id}', [$auth, 'verifyToken'], [$controller, 'show']);
$router->post('/cursos', [$auth, 'verifyToken'], [$controller, 'store']);
$router->put('/cursos/{id}', [$auth, 'verifyToken'], [$controller, 'update']);
$router->delete('/cursos/{id}', [$auth, 'verifyToken'], [$controller, 'destroy']);
