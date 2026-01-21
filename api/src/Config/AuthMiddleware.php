<?php

namespace App\Auth;

class AuthMiddleware {
    
    public function handle($allowedRoles = []) {
        // Garante compatibilidade com Nginx e Apache para pegar o Header
        $authHeader = null;
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        } elseif (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;
        }

        $authHeader = $authHeader ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(["message" => "Token não fornecido ou inválido"]);
            exit;
        }

        $token = $matches[1];
        $payload = JwtService::validate($token);

        if (!$payload) {
            http_response_code(401);
            echo json_encode(["message" => "Token inválido ou expirado"]);
            exit;
        }

        // Verifica Roles (Se $allowedRoles estiver vazio, permite qualquer usuário autenticado)
        if (!empty($allowedRoles)) {
            $userRole = $payload['role'] ?? 'user';
            
            // Infra Admin tem acesso total sempre
            if ($userRole === 'infra_admin') {
                return true;
            }

            if (!in_array($userRole, $allowedRoles)) {
                http_response_code(403);
                echo json_encode(["message" => "Acesso negado: Permissão insuficiente"]);
                exit;
            }
        }

        return true;
    }
}