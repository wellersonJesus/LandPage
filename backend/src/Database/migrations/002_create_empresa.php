<?php
/**
 * 002_create_empresa.php
 * Cria a tabela empresa
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    nome TEXT NOT NULL,
    slogan TEXT,
    descricao TEXT,
    cnpj TEXT UNIQUE,
    atividade TEXT,
    localizacao TEXT,
    missao TEXT,
    servicos TEXT,
    projetos_destaque TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);
SQL;

    $db->exec($sql);

    echo "✅ Migration 'empresa' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela empresa: " . $e->getMessage() . "\n";
}
