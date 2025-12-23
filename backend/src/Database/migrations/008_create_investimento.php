<?php
/**
 * 008_create_investimento.php
 * Cria a tabela INVESTIMENTO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS investimento (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT NOT NULL,
            descricao TEXT,
            valor_investido REAL,
            valor_atual REAL,
            data_inicio DATE,
            data_vencimento DATE,

            -- Relação com CONTRATO
            contrato_id INTEGER,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (contrato_id) REFERENCES contrato(id)
        );
    ");

    echo "✅ Migration 'investimento' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela investimento: \" . $e->getMessage() . \"\n";
}
