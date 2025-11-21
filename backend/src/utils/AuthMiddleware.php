<?php

require_once __DIR__ . '/../vendor/autoload.php'; // para Firebase JWT
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    public static function verifyToken()
    {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? null;

        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(['error' => 'Token não fornecido']);
            exit;
        }

        // Remove "Bearer "
        $token = str_replace('Bearer ', '', $authHeader);

        if (!$token) {
            http_response_code(401);
            echo json_encode(['error' => 'Formato de token inválido']);
            exit;
        }

        try {
            if (!isset($_ENV['JWT_SECRET'])) {
                http_response_code(500);
                echo json_encode(['error' => 'JWT_SECRET não definido']);
                exit;
            }

            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

            // Salva usuário decodificado globalmente, se quiser
            $GLOBALS['user'] = (array)$decoded;

        } catch (Exception $e) {
            http_response_code(403);
            echo json_encode(['error' => 'Token inválido ou expirado']);
            exit;
        }
    }
}
