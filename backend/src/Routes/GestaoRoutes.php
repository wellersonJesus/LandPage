<?php

use App\Controllers\GestaoController;
use App\Middleware\AuthMiddleware;

$router->group('/gestao', function($router) {

    // Rotas principais
    $router->get('/',        [AuthMiddleware::class, 'verify'], [GestaoController::class, 'getAll']);
    $router->get('/:id',     [AuthMiddleware::class, 'verify'], [GestaoController::class, 'getById']);
    $router->post('/',       [AuthMiddleware::class, 'verify'], [GestaoController::class, 'create']);
    $router->put('/:id',     [AuthMiddleware::class, 'verify'], [GestaoController::class, 'update']);
    $router->delete('/:id',  [AuthMiddleware::class, 'verify'], [GestaoController::class, 'delete']);

    // 🔹 Rotas relacionais (Gestão → Lançamentos)
    $router->get('/:id/lancamentos',  [AuthMiddleware::class, 'verify'], [GestaoController::class, 'getLancamentos']);
    $router->post('/:id/lancamentos', [AuthMiddleware::class, 'verify'], [GestaoController::class, 'createLancamento']);

});
