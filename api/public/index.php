<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Database\Database;
use Dotenv\Dotenv;

// Carrega variáveis de ambiente
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

// Cabeçalhos CORS para permitir acesso do Frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Rota simples de teste e inicialização do banco
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($uri === '/api/install') {
    try {
        $pdo = Database::getConnection();
        $sql = require __DIR__ . '/../src/Migrations/001_create_initial.php';
        $pdo->exec($sql);
        echo json_encode(["message" => "Banco de dados instalado com sucesso."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
    exit;
}

// Exemplo de resposta padrão
echo json_encode([
    "message" => "API Landpage rodando.",
    "endpoint" => $uri
]);