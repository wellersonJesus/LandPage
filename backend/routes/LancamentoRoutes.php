<?php

use Slim\Routing\RouteCollectorProxy;

$app->group('/lancamentos', function (RouteCollectorProxy $group) {

    $group->get('', 'LancamentoController:getAllLancamentos');
    $group->get('/{id}', 'LancamentoController:getLancamentoById');
    $group->post('', 'LancamentoController:createLancamento');
    $group->put('/{id}', 'LancamentoController:updateLancamento');
    $group->delete('/{id}', 'LancamentoController:deleteLancamento');

})->add('AuthMiddleware');
