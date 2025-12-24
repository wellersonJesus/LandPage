<?php

// Inclua seu autoload e controllers
require_once __DIR__ . '/../controllers/PlataformaController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

// Função auxiliar para capturar o método e rota
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remover prefixos se houver (ex: /api/plataforma)
$prefix = '/plataforma';
$path = substr($uri, strlen($prefix));

// Middleware JWT
$verifyToken = function() {
    AuthMiddleware::verifyToken();
};

// Rotas
if ($method === 'GET' && ($path === '' || $path === '/')) {
    $verifyToken();
    PlataformaController::getAllPlataformas();
}

if ($method === 'GET' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    PlataformaController::getPlataformaById($matches[1]);
}

if ($method === 'POST' && ($path === '' || $path === '/')) {
    $verifyToken();
    PlataformaController::createPlataforma();
}

if ($method === 'PUT' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    PlataformaController::updatePlataforma($matches[1]);
}

if ($method === 'DELETE' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    PlataformaController::deletePlataforma($matches[1]);
}
