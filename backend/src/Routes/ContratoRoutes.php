<?php

use App\Controllers\ContratoController;
use App\Middleware\AuthMiddleware;

// Middleware JWT
$auth = new AuthMiddleware();

// Controller
$controller = new ContratoController();

/**
 * Rotas CRUD de contratos
 */
$router->get('/contratos', [$auth, 'verifyToken'], [$controller, 'getAllContratos']);
$router->get('/contratos/{id}', [$auth, 'verifyToken'], [$controller, 'getContratoById']);
$router->post('/contratos', [$auth, 'verifyToken'], [$controller, 'createContrato']);
$router->put('/contratos/{id}', [$auth, 'verifyToken'], [$controller, 'updateContrato']);
$router->delete('/contratos/{id}', [$auth, 'verifyToken'], [$controller, 'deleteContrato']);

/**
 * Subrotas: contas
 */
$router->get('/contratos/{id}/contas', [$auth, 'verifyToken'], [$controller, 'getContasByContrato']);
$router->post('/contratos/{id}/contas', [$auth, 'verifyToken'], [$controller, 'createContaByContrato']);

/**
 * Subrotas: investimentos
 */
$router->get('/contratos/{id}/investimentos', [$auth, 'verifyToken'], [$controller, 'getInvestimentosByContrato']);
$router->post('/contratos/{id}/investimentos', [$auth, 'verifyToken'], [$controller, 'createInvestimentoByContrato']);
