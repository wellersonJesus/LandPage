<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Controllers\AuthController;
use App\Controllers\EmpresaController;
use App\Database\Database;

header('Content-Type: application/json; charset=utf-8');

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$db = Database::getConnection();

$authController    = new AuthController($db);
$empresaController = new EmpresaController($db);

switch (true) {

    case $uri === '/auth/login' && $method === 'POST':
        $authController->login();
        break;

    case $uri === '/auth/usuarios' && $method === 'POST':
        $authController->createUsuario();
        break;

    case $uri === '/auth/usuarios' && $method === 'GET':
        $authController->listUsuarios();
        break;

    case $uri === '/empresas' && $method === 'GET':
        $empresaController->getAllEmpresas();
        break;

    case $method === 'OPTIONS':
        http_response_code(200);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Rota não encontrada']);
}
