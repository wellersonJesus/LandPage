<?php
/**
 * 010_create_lancamento.php
 * Cria a tabela LANCAMENTO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS lancamento (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ano INTEGER NOT NULL,
            mes INTEGER NOT NULL,
            descricao TEXT,
            valor REAL,
            categoria TEXT,

            -- Relação com GESTAO
            gestao_id INTEGER,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (gestao_id) REFERENCES gestao(id)
        );
    ");

    echo "✅ Migration 'lancamento' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela lancamento: \" . $e->getMessage() . \"\n";
}
