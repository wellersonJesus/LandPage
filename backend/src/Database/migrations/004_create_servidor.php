<?php
/**
 * 004_create_servidor.php
 * Cria a tabela SERVIDOR
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS servidor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            servico TEXT NOT NULL,
            email TEXT,
            usuario TEXT,
            senha TEXT,
            tokens TEXT,
            frase TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'servidor' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela servidor: " . $e->getMessage() . "\n";
}
