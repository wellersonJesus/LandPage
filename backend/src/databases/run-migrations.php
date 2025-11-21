<?php

echo "🔧 Iniciando execução das migrations...\n";

// Carrega autoload e função getDB()
require_once __DIR__ . '/dbConnection.php';

// Carrega todas as migrations
$migrationFiles = glob(__DIR__ . '/migrations/*.php');

if (empty($migrationFiles)) {
    echo "⚠ Nenhuma migration encontrada.\n";
    exit;
}

$db = getDB(); // ← usa a função correta

foreach ($migrationFiles as $file) {
    echo "▶ Executando: " . basename($file) . "\n";

    require $file; // cada arquivo deve retornar SQL

    if (!isset($migration) || empty(trim($migration))) {
        echo "⚠ Migration vazia em " . basename($file) . "\n";
        continue;
    }

    try {
        $db->exec($migration);
        echo "✔ Migration aplicada com sucesso.\n";
    } catch (PDOException $e) {
        echo "❌ Erro ao aplicar migration " . basename($file) . ": " . $e->getMessage() . "\n";
    }

    unset($migration); // limpa variável entre migrations
}

echo "🎉 Todas as migrations foram executadas.\n";
