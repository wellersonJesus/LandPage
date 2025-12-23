<?php
/**
 * 006_create_plataforma.php
 * Cria a tabela PLATAFORMA
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS plataforma (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT,
            usuario TEXT,
            senha TEXT,
            tokens TEXT,

            -- Relação com SERVIDOR
            servidor_id INTEGER,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (servidor_id) REFERENCES servidor(id)
        );
    ");

    echo "✅ Migration 'plataforma' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela plataforma: \" . $e->getMessage() . \"\n";
}
