<?php
// server.php

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Dotenv\Dotenv;

require dirname(__DIR__) . '/vendor/autoload.php';

// --- Carrega variáveis do .env ---
$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

if (!isset($_ENV['JWT_SECRET'])) {
    echo "❌ JWT_SECRET não definido no .env\n";
    exit;
}

// --- Configura app Slim ---
$app = AppFactory::create();

// --- Logger tipo morgan ---
$logDir = dirname(__DIR__) . '/logs';
if (!is_dir($logDir)) {
    mkdir($logDir, 0777, true);
}
$logger = new Logger('api');
$logger->pushHandler(new StreamHandler($logDir . '/api.log', Logger::DEBUG));

// --- Middlewares básicos ---
$app->addBodyParsingMiddleware(); // parse JSON como express.json()
$app->addRoutingMiddleware();

// --- CORS (equivalente ao cors() do Express) ---
$app->add(function (ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// --- Middleware global de erros (como express global error handler) ---
$app->addErrorMiddleware(true, true, true);

// --- Rotas (equivalente ao app.use('/api', apiRoutes)) ---
require __DIR__ . '/index.php';

// --- Inicia o servidor ---
$port = $_ENV['PORT'] ?? 3000;

echo "🌐 Servidor rodando na porta {$port}\n";

$app->run();
