<?php

use App\Controllers\EmpresaController;
use App\Middleware\AuthMiddleware;

$router->group('/empresas', function($router) {

    // Rotas principais
    $router->get('/',            [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'getAll']);
    $router->get('/:id',         [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'getById']);
    $router->post('/',           [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'create']);
    $router->put('/:id',         [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'update']);
    $router->delete('/:id',      [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'delete']);

    // Rotas relacionais — contratos da empresa
    $router->get('/:id/contratos',  [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'getContratos']);
    $router->post('/:id/contratos', [AuthMiddleware::class, 'verify'], [EmpresaController::class, 'createContrato']);

});
