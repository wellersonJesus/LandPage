<?php

// Habilita exibição de erros para debug caso o scan falhe
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Headers para evitar problemas de CORS e garantir JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require __DIR__ . '/../../../vendor/autoload.php';

// Define explicitamente o que escanear:
// 1. O arquivo de configuração local (SwaggerConfig.php)
// 2. A pasta src da API (Controllers, Models)
$configFile = __DIR__ . '/SwaggerConfig.php';
$srcDir = __DIR__ . '/../../../src';

if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Arquivo SwaggerConfig.php não encontrado.']);
    exit;
}

$paths = [
    $configFile,
    $srcDir
];

try {
    $openapi = \OpenApi\Generator::scan($paths);
    echo $openapi->toJson();
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}