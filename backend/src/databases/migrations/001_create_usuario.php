<?php
/**
 * 001_create_usuario.php
 * Cria a tabela de usuários
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            role TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'usuario' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela usuario: " . $e->getMessage() . "\n";
}
