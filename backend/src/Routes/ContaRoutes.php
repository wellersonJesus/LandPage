<?php

namespace App\Routes;

use Slim\Routing\RouteCollectorProxy;
use App\Controllers\ContaController;
use App\Middleware\AuthMiddleware;

class ContaRoutes
{
    public function __invoke(RouteCollectorProxy $group)
    {
        // GET /conta
        $group->get('', [ContaController::class, 'getAllContas'])
              ->add(new AuthMiddleware());

        // GET /conta/{id}
        $group->get('/{id}', [ContaController::class, 'getContaById'])
              ->add(new AuthMiddleware());

        // POST /conta
        $group->post('', [ContaController::class, 'createConta'])
              ->add(new AuthMiddleware());

        // PUT /conta/{id}
        $group->put('/{id}', [ContaController::class, 'updateConta'])
              ->add(new AuthMiddleware());

        // DELETE /conta/{id}
        $group->delete('/{id}', [ContaController::class, 'deleteConta'])
              ->add(new AuthMiddleware());
    }
}
