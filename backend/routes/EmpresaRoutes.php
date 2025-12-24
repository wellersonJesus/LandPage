<?php

use App\Controllers\EmpresaController;
use App\Security\AuthGuard;

return function ($router, $db) {

    $controller = new EmpresaController($db);

    /**
     * =====================================================
     * Empresas (JWT obrigatório)
     * =====================================================
     */

    // GET /empresas
    $router->add('GET', '/empresas', function () use ($controller) {
        AuthGuard::user();
        $controller->getAll();
    });

    // GET /empresas/{id}
    $router->add('GET', '/empresas/{id}', function ($id) use ($controller) {
        AuthGuard::user();
        $controller->getById((int) $id);
    });

    // POST /empresas (admin)
    $router->add('POST', '/empresas', function () use ($controller) {
        AuthGuard::requireRole('admin');
        $controller->create();
    });

    // PUT /empresas/{id} (admin)
    $router->add('PUT', '/empresas/{id}', function ($id) use ($controller) {
        AuthGuard::requireRole('admin');
        $controller->update((int) $id);
    });

    // DELETE /empresas/{id} (admin)
    $router->add('DELETE', '/empresas/{id}', function ($id) use ($controller) {
        AuthGuard::requireRole('admin');
        $controller->delete((int) $id);
    });

    /**
     * =====================================================
     * Contratos da Empresa
     * =====================================================
     */

    // GET /empresas/{id}/contratos
    $router->add('GET', '/empresas/{id}/contratos', function ($id) use ($controller) {
        AuthGuard::user();
        $controller->getContratos((int) $id);
    });

    // POST /empresas/{id}/contratos (admin)
    $router->add('POST', '/empresas/{id}/contratos', function ($id) use ($controller) {
        AuthGuard::requireRole('admin');
        $controller->createContrato((int) $id);
    });
};
