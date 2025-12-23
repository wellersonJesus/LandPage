<?php
/**
 * 007_create_contrato.php
 * Cria a tabela CONTRATO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS contrato (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_contrato TEXT NOT NULL,
            data_inicio DATE,
            data_vigencia DATE,
            duracao TEXT,
            descricao TEXT,
            remuneracao TEXT,
            aparelho TEXT,
            chip TEXT,
            email_contato TEXT,
            telefone_contato TEXT,
            login TEXT,
            banco TEXT,
            pix TEXT,
            recebimentos TEXT,
            mei TEXT,
            gestao_financeira TEXT,
            parceria_empresarial TEXT,

            -- Relação com EMPRESA
            empresa_id INTEGER,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (empresa_id) REFERENCES empresa(id)
        );
    ");

    echo "✅ Migration 'contrato' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela contrato: \" . $e->getMessage() . \"\n";
}
