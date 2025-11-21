<?php

use App\Controllers\DispositivoController;
use App\Middleware\AuthMiddleware;

$router->group('/dispositivos', function($router) {

    // ---- Rotas principais ----
    $router->get('/',            [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'getAll']);
    $router->get('/:id',         [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'getById']);
    $router->post('/',           [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'create']);
    $router->put('/:id',         [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'update']);
    $router->delete('/:id',      [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'delete']);

    // ---- Rotas relacionais ----
    $router->get('/:id/contas',  [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'getContas']);
    $router->post('/:id/contas', [AuthMiddleware::class, 'verify'], [DispositivoController::class, 'createConta']);

});
