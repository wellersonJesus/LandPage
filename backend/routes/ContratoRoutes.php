<?php

use App\Controllers\ContratoController;
use App\Security\AuthGuard;

return function ($router, $db) {

    $controller = new ContratoController($db);

    // =========================
    // CRUD CONTRATOS
    // =========================

    $router->add(
        'GET',
        '/contratos',
        [$controller, 'getAll'],
        fn () => AuthGuard::requireAuth()
    );

    $router->add(
        'GET',
        '/contratos/{id}',
        [$controller, 'getById'],
        fn () => AuthGuard::requireAuth()
    );

    $router->add(
        'POST',
        '/contratos',
        [$controller, 'create'],
        fn () => AuthGuard::requireRole(['admin'])
    );

    $router->add(
        'PUT',
        '/contratos/{id}',
        [$controller, 'update'],
        fn () => AuthGuard::requireRole(['admin'])
    );

    $router->add(
        'DELETE',
        '/contratos/{id}',
        [$controller, 'delete'],
        fn () => AuthGuard::requireRole(['admin'])
    );

    // =========================
    // CONTAS DO CONTRATO
    // =========================

    $router->add(
        'GET',
        '/contratos/{id}/contas',
        [$controller, 'getContas'],
        fn () => AuthGuard::requireAuth()
    );

    $router->add(
        'POST',
        '/contratos/{id}/contas',
        [$controller, 'createConta'],
        fn () => AuthGuard::requireRole(['admin'])
    );

    // =========================
    // INVESTIMENTOS DO CONTRATO
    // =========================

    $router->add(
        'GET',
        '/contratos/{id}/investimentos',
        [$controller, 'getInvestimentos'],
        fn () => AuthGuard::requireAuth()
    );

    $router->add(
        'POST',
        '/contratos/{id}/investimentos',
        [$controller, 'createInvestimento'],
        fn () => AuthGuard::requireRole(['admin'])
    );
};
