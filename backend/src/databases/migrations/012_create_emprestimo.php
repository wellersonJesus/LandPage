<?php
/**
 * 012_create_emprestimo.php
 * Cria a tabela EMPRESTIMO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS emprestimo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cnpj TEXT,
            descricao TEXT,
            valor_total REAL,
            valor_pago REAL,
            valor_a_pagar REAL,
            data_parcela DATE,
            numero_parcela TEXT,
            valor_parcela REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    echo "✅ Migration 'emprestimo' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela emprestimo: \" . $e->getMessage() . \"\n";
}
