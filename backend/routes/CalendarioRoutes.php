<?php

use App\Controllers\CalendarioController;
use App\Security\AuthGuard;

return function ($router, $db) {

    $controller = new CalendarioController($db);

    // =========================
    // LISTAR TODOS
    // =========================
    $router->add(
        'GET',
        '/calendarios',
        [$controller, 'getAll'],
        fn () => AuthGuard::requireAuth()
    );

    // =========================
    // BUSCAR POR ID
    // =========================
    $router->add(
        'GET',
        '/calendarios/{id}',
        [$controller, 'getById'],
        fn () => AuthGuard::requireAuth()
    );

    // =========================
    // CRIAR
    // =========================
    $router->add(
        'POST',
        '/calendarios',
        [$controller, 'create'],
        fn () => AuthGuard::requireRole(['admin'])
    );

    // =========================
    // ATUALIZAR
    // =========================
    $router->add(
        'PUT',
        '/calendarios/{id}',
        [$controller, 'update'],
        fn () => AuthGuard::requireRole(['admin'])
    );

    // =========================
    // DELETAR
    // =========================
    $router->add(
        'DELETE',
        '/calendarios/{id}',
        [$controller, 'delete'],
        fn () => AuthGuard::requireRole(['admin'])
    );
};
