<?php
/**
 * 005_create_dispositivo.php
 * Cria a tabela DISPOSITIVO
 */

require_once __DIR__ . '/../dbConnection.php';

$db = getDB();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS dispositivo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dispositivo TEXT NOT NULL,
            email TEXT,
            usuario TEXT,
            senha TEXT,
            tokens TEXT,

            -- Relação com CONTA
            conta_id INTEGER,
            
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (conta_id) REFERENCES conta(id)
        );
    ");

    echo "✅ Migration 'dispositivo' aplicada com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao criar tabela dispositivo: \" . $e->getMessage() . \"\n";
}
