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

        $envPath = $_ENV['SQLITE_PATH'] ?? null;

        // Se for caminho absoluto, usa. Se não, força na pasta atual (src/Database)
        if ($envPath && (strpos($envPath, '/') === 0 || preg_match('/^[a-zA-Z]:\\\\/', $envPath))) {
            $dbPath = $envPath;
        } else {
            $filename = $envPath ? basename($envPath) : 'landpage.db';
            $dbPath = __DIR__ . '/' . $filename;
        }

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
            // Lança a exceção para ser tratada pelo caller (Script ou Middleware da API)
            throw $e;
        }
    }
}
