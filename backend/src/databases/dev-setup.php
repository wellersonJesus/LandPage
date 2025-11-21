<?php
/**
 * dev-setup.php
 * Script de desenvolvimento:
 * 1) Cria/Atualiza banco com migrations
 * 2) Insere dados iniciais (seeds)
 * 3) Testa conexão
 */

declare(strict_types=1);

use Dotenv\Dotenv;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/dbConnection.php';

// Carrega .env
$dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();

// -------------------------------
// Testa conexão
// -------------------------------
try {
    $db = getDB();
    echo "✅ Conexão com SQLite funcionando em: " . ($_ENV['SQLITE_PATH_LOCAL'] ?? 'desconhecido') . PHP_EOL;
} catch (PDOException $e) {
    echo "❌ Erro ao conectar ao banco: " . $e->getMessage() . PHP_EOL;
    exit(1);
}

// -------------------------------
// Rodar migrations
// -------------------------------
$migrationsDir = __DIR__ . '/migrations';
if (!is_dir($migrationsDir)) {
    echo "⚠️  Diretório de migrations não encontrado: $migrationsDir" . PHP_EOL;
} else {
    $migrationFiles = glob($migrationsDir . '/*.php');
    foreach ($migrationFiles as $file) {
        echo "🚀 Executando migration: $file" . PHP_EOL;
        require_once $file;
    }
}

// -------------------------------
// Rodar seeds
// -------------------------------
$seedsFile = __DIR__ . '/seed-db.php';
if (!file_exists($seedsFile)) {
    echo "⚠️  Arquivo de seeds não encontrado: $seedsFile" . PHP_EOL;
} else {
    echo "🚀 Inserindo dados seed..." . PHP_EOL;
    require_once $seedsFile;
}

// -------------------------------
// Final
// -------------------------------
echo "✅ Banco preparado! Pronto para rodar a API." . PHP_EOL;
