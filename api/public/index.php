<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Router;
use Dotenv\Dotenv;

// Carrega variáveis de ambiente
if (file_exists(__DIR__ . '/../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->safeLoad();
} elseif (file_exists(__DIR__ . '/../../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->safeLoad();
}

// Configuração de CORS (Essencial para evitar 'Failed to fetch')
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Responde imediatamente a requisições OPTIONS (Pre-flight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

$router = new Router();

// Rotas de Autenticação
$router->add('POST', '/api/login', 'AuthController', 'login');

// Rotas de Recursos (CRUD Automático)
$router->resource('/api/usuarios', 'UsuarioController');
$router->resource('/api/empresas', 'EmpresaController');
$router->resource('/api/gestao', 'GestaoController');
$router->resource('/api/lancamentos', 'LancamentoController');
$router->resource('/api/contas', 'ContaController');
$router->resource('/api/emprestimos', 'EmprestimoController');
$router->resource('/api/investimentos', 'InvestimentoController');
$router->resource('/api/skills', 'SkillController');
$router->resource('/api/cursos', 'CursoController');
$router->resource('/api/redes', 'RedeController');

// Despacha a requisição
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);