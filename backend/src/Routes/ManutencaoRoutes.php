<?php

use Slim\Routing\RouteCollectorProxy;

$app->group('/manutencao', function (RouteCollectorProxy $group) {

    $group->get('', 'ManutencaoController:getAllManutencaos');
    $group->get('/{id}', 'ManutencaoController:getManutencaoById');
    $group->post('', 'ManutencaoController:createManutencao');
    $group->put('/{id}', 'ManutencaoController:updateManutencao');
    $group->delete('/{id}', 'ManutencaoController:deleteManutencao');

})->add('AuthMiddleware');
