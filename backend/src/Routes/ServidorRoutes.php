<?php

require_once __DIR__ . '/../controllers/ServidorController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

// Captura método e caminho
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove prefixo /servidor
$prefix = '/servidor';
$path = substr($uri, strlen($prefix));

// Middleware JWT
$verifyToken = function() {
    AuthMiddleware::verifyToken();
};

// ----------------------------
// Rotas padrão
// ----------------------------
if ($method === 'GET' && ($path === '' || $path === '/')) {
    $verifyToken();
    ServidorController::getAllServidores();
}

if ($method === 'GET' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    ServidorController::getServidorById($matches[1]);
}

if ($method === 'POST' && ($path === '' || $path === '/')) {
    $verifyToken();
    ServidorController::createServidor();
}

if ($method === 'PUT' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    ServidorController::updateServidor($matches[1]);
}

if ($method === 'DELETE' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    ServidorController::deleteServidor($matches[1]);
}

// ----------------------------
// Rotas relacionais (Servidor -> Plataformas)
// ----------------------------
if ($method === 'GET' && preg_match('#^/(\d+)/plataformas$#', $path, $matches)) {
    $verifyToken();
    ServidorController::getPlataformasByServidor($matches[1]);
}

if ($method === 'POST' && preg_match('#^/(\d+)/plataformas$#', $path, $matches)) {
    $verifyToken();
    ServidorController::createPlataformaByServidor($matches[1]);
}
