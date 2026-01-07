<?php
declare(strict_types=1);

// backend/src/Database/dbConnection.php

require_once __DIR__ . '/../../vendor/autoload.php';

use PDO;
use PDOException;

/**
 * Cria e retorna conexão SQLite (singleton)
 */
function getDB(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    // ======================================
    // PATH FIXO E CONFIÁVEL (IGUAL AO php -r)
    // ======================================
    $dbPath = __DIR__ . '/../db/wsmanager_local.db';

    // ======================================
    // GARANTE DIRETÓRIO
    // ======================================
    $dbDir = dirname($dbPath);

    if (!is_dir($dbDir)) {
        mkdir($dbDir, 0775, true);
    }

    try {
        // ======================================
        // CONEXÃO SQLITE (CRIA O ARQUIVO)
        // ======================================
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // ======================================
        // FORÇA MATERIALIZAÇÃO DO ARQUIVO
        // (IGUAL AO CREATE TABLE DO php -r)
        // ======================================
        $pdo->exec('CREATE TABLE IF NOT EXISTS __db_init (id INTEGER PRIMARY KEY);');

        echo "🗃️ Banco SQLite criado/em uso em:\n{$dbPath}\n";

        return $pdo;

    } catch (PDOException $e) {
        fwrite(STDERR, "❌ Erro SQLite: {$e->getMessage()}\n");
        exit(1);
    }
}
