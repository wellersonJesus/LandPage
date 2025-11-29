<?php
/**
 * 009_create_gestao.php
 * Cria a tabela GESTAO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS gestao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE NOT NULL,
            km_percorrido REAL,
            meta REAL,
            horas_trabalhadas TEXT,
            receita REAL,
            despesa REAL,
            lucro REAL,
            conta REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'gestao' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela gestao: \" . $e->getMessage() . \"\n";
}
