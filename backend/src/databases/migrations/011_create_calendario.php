<?php
/**
 * 011_create_calendario.php
 * Cria a tabela CALENDARIO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS calendario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE NOT NULL,
            dia_semana TEXT,
            mes INTEGER,
            ano INTEGER,
            feriado BOOLEAN,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'calendario' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela calendario: \" . $e->getMessage() . \"\n";
}
