<?php

namespace App\Controllers;

use App\Models\Usuario;
use App\Config\JwtService;

class AuthController {
    
    public function login() {
        $data = json_decode(file_get_contents("php://input"), true) ?? [];
        $email = $data['email'] ?? '';
        $senha = $data['senha'] ?? '';

        if (empty($email) || empty($senha)) {
            http_response_code(400);
            echo json_encode(["message" => "Email e senha são obrigatórios"]);
            return;
        }

        // 1. Verifica Admin de Infraestrutura (via .ENV)
        $envAdminEmail = $_ENV['ADMIN_EMAIL'] ?? null;
        $envAdminPass = $_ENV['ADMIN_PASSWORD'] ?? null;

        if ($envAdminEmail && $envAdminPass && $email === $envAdminEmail && $senha === $envAdminPass) {
            $token = JwtService::create([
                'id' => 0,
                'nome' => $_ENV['ADMIN_NAME'] ?? 'Admin',
                'email' => $email,
                'role' => 'infra_admin' // Role especial com acesso total
            ]);
            
            echo json_encode(["token" => $token, "role" => "infra_admin"]);
            return;
        }

        // 2. Verifica Usuário de Aplicação (via Banco de Dados)
        $usuarioModel = new Usuario();
        // Precisamos de um método findByEmail no Model ou fazer query direta. 
        // Como BaseModel é genérico, vamos instanciar PDO aqui ou adicionar findByEmail no Usuario.
        // Para manter simples, vamos buscar todos e filtrar (não performático para muitos users, mas ok para MVP)
        // O ideal seria adicionar findByEmail no BaseModel.
        $usuarios = $usuarioModel->getAll();
        foreach ($usuarios as $user) {
            if ($user['email'] === $email && password_verify($senha, $user['senha'])) {
                $token = JwtService::create([
                    'id' => $user['id'],
                    'nome' => $user['nome'],
                    'email' => $user['email'],
                    'role' => $user['role'] // admin, gestor, financeiro, user
                ]);
                echo json_encode(["token" => $token, "role" => $user['role']]);
                return;
            }
        }

        http_response_code(401);
        echo json_encode(["message" => "Credenciais inválidas"]);
    }
}