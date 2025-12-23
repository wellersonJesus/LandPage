<?php

namespace App\Database;

use PDO;
use PDOException;
use Dotenv\Dotenv;

class Database
{
    private static ?PDO $connection = null;

    public static function getConnection(): PDO
    {
        if (self::$connection !== null) {
            return self::$connection;
        }

        // Carrega .env apenas uma vez
        $dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
        $dotenv->safeLoad();

        $dbPath = $_ENV['SQLITE_PATH_LOCAL']
            ?? dirname(__DIR__, 2) . '/wsmanager_local.db';

        $dir = dirname($dbPath);

        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        if (!file_exists($dbPath)) {
            touch($dbPath);
            chmod($dbPath, 0666);
        }

        try {
            self::$connection = new PDO('sqlite:' . $dbPath);
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return self::$connection;

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'error' => 'Erro ao conectar no banco de dados'
            ]);
            exit;
        }
    }
}
