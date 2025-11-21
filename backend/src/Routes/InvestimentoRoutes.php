<?php

use App\Controllers\InvestimentoController;
use App\Middleware\AuthMiddleware;

$router->group('/investimentos', function($router) {

    $router->get('/',       [AuthMiddleware::class, 'verify'], [InvestimentoController::class, 'getAll']);
    $router->get('/:id',    [AuthMiddleware::class, 'verify'], [InvestimentoController::class, 'getById']);
    $router->post('/',      [AuthMiddleware::class, 'verify'], [InvestimentoController::class, 'create']);
    $router->put('/:id',    [AuthMiddleware::class, 'verify'], [InvestimentoController::class, 'update']);
    $router->delete('/:id', [AuthMiddleware::class, 'verify'], [InvestimentoController::class, 'delete']);

});
