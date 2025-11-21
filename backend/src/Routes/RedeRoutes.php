<?php

require_once __DIR__ . '/../controllers/RedeController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

// Captura método e caminho
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove prefixo /rede
$prefix = '/rede';
$path = substr($uri, strlen($prefix));

// Middleware JWT
$verifyToken = function() {
    AuthMiddleware::verifyToken();
};

// Rotas
if ($method === 'GET' && ($path === '' || $path === '/')) {
    $verifyToken();
    RedeController::getAllRedes();
}

if ($method === 'GET' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    RedeController::getRedeById($matches[1]);
}

if ($method === 'POST' && ($path === '' || $path === '/')) {
    $verifyToken();
    RedeController::createRede();
}

if ($method === 'PUT' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    RedeController::updateRede($matches[1]);
}

if ($method === 'DELETE' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    RedeController::deleteRede($matches[1]);
}
