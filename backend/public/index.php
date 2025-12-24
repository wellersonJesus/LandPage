<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Database\Database;
use App\Route\Router;
use App\Http\Response;

header('Content-Type: application/json; charset=utf-8');

// ============================
// CONEXÃO COM BANCO
// ============================
$db = Database::getConnection();

// ============================
// INSTÂNCIA DO ROUTER
// ============================
$router = new Router();

// ============================
// URI E MÉTODO
// ============================
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// ============================
// CORS PREFLIGHT
// ============================
if ($method === 'OPTIONS') {
    Response::noContent();
    exit;
}

// ============================
// CARREGAMENTO AUTOMÁTICO DAS ROTAS
// ============================
$routesPath = __DIR__ . '/../routes';

foreach (scandir($routesPath) as $file) {

    if (
        $file === '.' ||
        $file === '..' ||
        $file === 'index.php' ||
        !str_ends_with($file, 'Routes.php')
    ) {
        continue;
    }

    $routeFile = $routesPath . '/' . $file;

    $register = require $routeFile;

    if (is_callable($register)) {
        $register($router, $db);
    }
}

// ============================
// DISPATCH FINAL
// ============================
$router->dispatch($uri, $method);
