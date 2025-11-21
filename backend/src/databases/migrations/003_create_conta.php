<?php
/**
 * 003_create_conta.php
 * Cria a tabela de contas
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS conta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titular TEXT NOT NULL,
            tipo_conta TEXT NOT NULL,
            identificador TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'conta' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela conta: " . $e->getMessage() . "\n";
}
