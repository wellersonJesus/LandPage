<?php

namespace App\Config;

use PDO;
use PDOException;

class Database {
    private static $instance = null;

    public static function getConnection() {
        if (self::$instance === null) {
            $envPath = $_ENV['SQLITE_PATH'] ?? 'src/Database/db/landpage.db';
            
            // Ajusta o caminho absoluto (baseado em api/src/Database)
            // dirname(__DIR__, 2) volta para a raiz da API (api/)
            $dbPath = dirname(__DIR__, 2) . '/' . $envPath;
            
            $dir = dirname($dbPath);
            if (!file_exists($dir)) {
                mkdir($dir, 0777, true);
            }

            try {
                self::$instance = new PDO("sqlite:$dbPath");
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                die("Erro de Conexão: " . $e->getMessage());
            }
        }
        return self::$instance;
    }
}