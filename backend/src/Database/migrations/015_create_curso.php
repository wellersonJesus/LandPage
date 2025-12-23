<?php
/**
 * 015_create_curso.php
 * Cria a tabela CURSO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS curso (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT,
            usuario TEXT,
            senha TEXT,
            tokens TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'curso' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela curso: \" . $e->getMessage() . \"\n";
}
