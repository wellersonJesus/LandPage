<?php
// server.php

use Slim\Factory\AppFactory;
use Slim\Exception\HttpInternalServerErrorException;
use Slim\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

require __DIR__ . '/vendor/autoload.php';

// --- Carrega variáveis do .env ---
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if (!isset($_ENV['JWT_SECRET'])) {
    echo "❌ JWT_SECRET não definido no .env\n";
    exit;
}

// --- Configura app Slim ---
$app = AppFactory::create();

// --- Logger tipo morgan ---
$logger = new Logger('api');
$logger->pushHandler(new StreamHandler(__DIR__ . '/logs/api.log', Logger::DEBUG));

// --- Middlewares básicos ---
$app->addBodyParsingMiddleware(); // parse JSON como express.json()
$app->addRoutingMiddleware();

// --- CORS (equivalente ao cors() do Express) ---
$app->add(function (ServerRequestInterface $request, $handler): ResponseInterface {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// --- Middleware global de erros (como express global error handler) ---
$app->addErrorMiddleware(true, true, true);

// --- Rotas (equivalente ao app.use('/api', apiRoutes)) ---
require __DIR__ . '/src/routes/index.php';

// --- Inicia o servidor ---
$port = $_ENV['PORT'] ?? 3000;

echo "🌐 Servidor rodando na porta {$port}\n";

$app->run();
