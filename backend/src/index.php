<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Rota Base (Health Check)
$app->get('/', function (Request $request, Response $response) {
    $payload = json_encode([
        'status' => 'online',
        'service' => 'Landpage API',
        'version' => '1.0.0'
    ]);
    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});

// Adicione outros grupos de rotas aqui (ex: require __DIR__ . '/auth.php';)
