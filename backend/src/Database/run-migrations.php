<?php
// backend/src/Database/run-migrations.php

declare(strict_types=1);

echo PHP_EOL . "🔧 Iniciando execução das migrations..." . PHP_EOL;

// ================================
// BOOTSTRAP
// ================================
require dirname(__DIR__, 2) . '/vendor/autoload.php';

// Carrega variáveis de ambiente
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->safeLoad();

use PDO;
use PDOException;
use App\Database\Database;

// ================================
// PATHS
// ================================
$migrationsDir = __DIR__ . '/migrations';

// ================================
// VALIDATIONS
// ================================
if (!is_dir($migrationsDir)) {
    echo "📂 Criando diretório de migrations..." . PHP_EOL;
    mkdir($migrationsDir, 0777, true);
}

// Busca e ordena migrations
$migrationFiles = glob($migrationsDir . '/*.php');
sort($migrationFiles);

if (empty($migrationFiles)) {
    echo "⚠ Nenhuma migration encontrada." . PHP_EOL;
    exit(0);
}

// ================================
// DATABASE
// ================================
$db = Database::getConnection();

// Cria tabela de histórico de migrations se não existir
$db->exec("CREATE TABLE IF NOT EXISTS migrations_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name TEXT NOT NULL UNIQUE,
    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

// ================================
// EXECUTION
// ================================
foreach ($migrationFiles as $file) {
    $migration = null;

    $migrationName = basename($file);

    // Verifica se já foi executada
    $stmt = $db->prepare("SELECT COUNT(*) FROM migrations_history WHERE migration_name = ?");
    $stmt->execute([$migrationName]);
    if ($stmt->fetchColumn() > 0) {
        continue;
    }

    echo PHP_EOL . "▶ Executando migration: " . $migrationName . PHP_EOL;

    require $file;

    if (!isset($migration) || !is_string($migration) || trim($migration) === '') {
        echo "⚠ Migration inválida ou vazia. Ignorada." . PHP_EOL;
        continue;
    }

    try {
        $db->exec($migration);
        
        // Registra no histórico
        $stmt = $db->prepare("INSERT INTO migrations_history (migration_name) VALUES (?)");
        $stmt->execute([$migrationName]);
        
        echo "✔ Migration aplicada com sucesso." . PHP_EOL;
    } catch (PDOException $e) {
        fwrite(
            STDERR,
            "❌ Erro ao aplicar migration " . basename($file) . PHP_EOL .
            "➡ " . $e->getMessage() . PHP_EOL
        );
        exit(1); // Para tudo para evitar banco inconsistente
    }

    unset($migration);
}

echo PHP_EOL . "🎉 Todas as migrations foram executadas com sucesso!" . PHP_EOL;
