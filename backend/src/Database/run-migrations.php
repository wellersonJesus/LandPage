<?php
// backend/src/Database/run-migrations.php

declare(strict_types=1);

echo PHP_EOL . "🔧 Iniciando execução das migrations..." . PHP_EOL;

// ================================
// BOOTSTRAP
// ================================
require_once __DIR__ . '/dbConnection.php';

use PDO;
use PDOException;

// ================================
// PATHS
// ================================
$migrationsDir = __DIR__ . '/migrations';

// ================================
// VALIDATIONS
// ================================
if (!is_dir($migrationsDir)) {
    fwrite(STDERR, "❌ Diretório de migrations não encontrado: {$migrationsDir}" . PHP_EOL);
    exit(1);
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
$db = getDB();

// ================================
// EXECUTION
// ================================
foreach ($migrationFiles as $file) {
    $migration = null;

    echo PHP_EOL . "▶ Executando migration: " . basename($file) . PHP_EOL;

    require $file;

    if (!isset($migration) || !is_string($migration) || trim($migration) === '') {
        echo "⚠ Migration inválida ou vazia. Ignorada." . PHP_EOL;
        continue;
    }

    try {
        $db->exec($migration);
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
