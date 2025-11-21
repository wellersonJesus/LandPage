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

        // Caminho vindo do .env ou fallback local
        $dbPath = $_ENV['SQLITE_PATH_LOCAL'] 
            ?? __DIR__ . '/wsmanager_local.db';

        $dir = dirname($dbPath);

        // 🔧 Garante que o diretório existe
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        // 🔧 Garante permissão para criar e escrever no arquivo
        if (!file_exists($dbPath)) {
            touch($dbPath);
            chmod($dbPath, 0666);
        }

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
