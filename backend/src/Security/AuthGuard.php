<?php

namespace App\Http;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class AuthGuard
{
    public static function user(): array
    {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            Response::error('Token não informado', 401);
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $decoded = JWT::decode(
                $token,
                new Key($_ENV['JWT_SECRET'], 'HS256')
            );

            return (array) $decoded;

        } catch (Exception $e) {
            Response::error('Token inválido ou expirado', 401);
        }
    }

    public static function requireRole(array $roles): array
    {
        $user = self::user();

        if (!in_array($user['role'], $roles)) {
            Response::error('Acesso negado', 403);
        }

        return $user;
    }
}
