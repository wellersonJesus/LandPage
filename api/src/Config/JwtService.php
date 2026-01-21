<?php

namespace App\Config;

class JwtService {
    // Segredo deve vir do .env em produção

    private static function getSecret() {
        $secret = $_ENV['JWT_SECRET'] ?? getenv('JWT_SECRET');
        if (empty($secret)) {
            throw new \Exception('JWT_SECRET não definido nas variáveis de ambiente (.env)');
        }
        return $secret;
    }

    public static function create(array $payload) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload['exp'] = time() + (60 * 60 * 24); // 24 horas
        $payloadJson = json_encode($payload);

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payloadJson));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::getSecret(), true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function validate($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return false;

        [$header, $payload, $signature] = $parts;

        $validSignature = hash_hmac('sha256', $header . "." . $payload, self::getSecret(), true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($validSignature));

        if ($base64UrlSignature !== $signature) return false;

        $payloadData = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payload)), true);
        
        if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
            return false; // Expirado
        }

        return $payloadData;
    }
    
    public static function getPayload($token) {
        $parts = explode('.', $token);
        return json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
    }
}