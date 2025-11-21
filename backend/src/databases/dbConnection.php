<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

/**
 * Retorna instância única de conexão SQLite
 */
function getDB() {
    static $db = null;

    if ($db === null) {
        $dbPath = $_ENV['SQLITE_PATH_LOCAL'] ?? __DIR__ . '/wsmanager_local.db';
        $dbPath = realpath(dirname($dbPath)) . '/' . basename($dbPath);

        try {
            $db = new PDO("sqlite:" . $dbPath);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Erro ao abrir o banco de dados: " . $e->getMessage();
            exit;
        }
    }

    return $db;
}
