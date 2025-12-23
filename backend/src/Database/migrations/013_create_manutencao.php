<?php
/**
 * 013_create_manutencao.php
 * Cria a tabela MANUTENCAO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS manutencao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_manutencao TEXT NOT NULL,
            data_ultima DATE,
            valor_pago REAL,
            data_proxima DATE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'manutencao' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela manutencao: \" . $e->getMessage() . \"\n";
}
