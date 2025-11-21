<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Controllers\AuthController;

header('Content-Type: application/json; charset=utf-8');

$controller = new AuthController();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($uri === '/auth/login' && $method === 'POST') {
    $controller->login();
} elseif ($uri === '/auth/usuarios' && $method === 'POST') {
    $controller->createUsuario();
} elseif ($uri === '/auth/usuarios' && $method === 'GET') {
    $controller->listUsuarios();
} elseif ($method === 'OPTIONS') {
    http_response_code(200);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Rota não encontrada']);
}
