<?php
require_once __DIR__ . '/../controllers/CalendarioController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

verifyToken(); // todas as rotas protegidas

// GET /calendario
if ($method === 'GET' && $uri === '/calendario') {
    CalendarioController::getAll();
}

// GET /calendario/{id}
if ($method === 'GET' && preg_match('/\/calendario\/(\d+)/', $uri, $matches)) {
    CalendarioController::getById($matches[1]);
}

// POST /calendario
if ($method === 'POST' && $uri === '/calendario') {
    $body = json_decode(file_get_contents("php://input"), true);
    CalendarioController::create($body);
}

// PUT /calendario/{id}
if ($method === 'PUT' && preg_match('/\/calendario\/(\d+)/', $uri, $matches)) {
    $body = json_decode(file_get_contents("php://input"), true);
    CalendarioController::update($matches[1], $body);
}

// DELETE /calendario/{id}
if ($method === 'DELETE' && preg_match('/\/calendario\/(\d+)/', $uri, $matches)) {
    CalendarioController::delete($matches[1]);
}
