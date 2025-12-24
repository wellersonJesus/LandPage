<?php

use App\Controllers\EmprestimoController;
use App\Middleware\AuthMiddleware;

$router->group('/emprestimos', function($router) {

    // Rotas CRUD principais
    $router->get('/',       [AuthMiddleware::class, 'verify'], [EmprestimoController::class, 'getAll']);
    $router->get('/:id',    [AuthMiddleware::class, 'verify'], [EmprestimoController::class, 'getById']);
    $router->post('/',      [AuthMiddleware::class, 'verify'], [EmprestimoController::class, 'create']);
    $router->put('/:id',    [AuthMiddleware::class, 'verify'], [EmprestimoController::class, 'update']);
    $router->delete('/:id', [AuthMiddleware::class, 'verify'], [EmprestimoController::class, 'delete']);

});
