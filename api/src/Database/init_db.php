<?php

$autoloadPath = __DIR__ . '/../../vendor/autoload.php';

if (!file_exists($autoloadPath)) {
    die("Erro: Dependências não instaladas. Execute 'cd api && composer install' no terminal.\n");
}

require $autoloadPath;

use App\Config\Database;
use Dotenv\Dotenv;

// Carrega variáveis de ambiente
// Tenta carregar de api/ (.env local da api) ou da raiz do projeto
if (file_exists(__DIR__ . '/../../.env')) { 
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->safeLoad();
} elseif (file_exists(__DIR__ . '/../../../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
    $dotenv->safeLoad();
}

try {
    $pdo = Database::getConnection();
    
    $sql = require __DIR__ . '/../Migrations/001_create_initial.php';
    $pdo->exec($sql);
    
    echo "Banco de dados inicializado e tabelas criadas com sucesso.\n";
} catch (Exception $e) {
    echo "Erro ao inicializar o banco de dados: " . $e->getMessage() . "\n";
}