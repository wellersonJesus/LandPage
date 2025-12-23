<?php
/**
 * 014_create_skill.php
 * Cria a tabela SKILL
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS skill (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            categoria TEXT,
            nivel TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'skill' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela skill: \" . $e->getMessage() . \"\n";
}
