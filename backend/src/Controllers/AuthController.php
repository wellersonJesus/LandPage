<?php

namespace App\Controllers;

use App\Services\AuthService;
use App\Http\Response;
use Firebase\JWT\JWT;
use PDO;

class AuthController
{
    private AuthService $service;

    public function __construct(PDO $db)
    {
        $this->service = new AuthService($db);
    }

    public function login(): void
    {
        $body = json_decode(file_get_contents('php://input'), true);

        if (!isset($body['email'], $body['password'])) {
            Response::error('Credenciais ausentes', 400);
        }

        $user = $this->service->authenticate(
            $body['email'],
            $body['password']
        );

        if (!$user) {
            Response::error('Credenciais inválidas', 401);
        }

        $payload = [
            'id'    => $user['id'],
            'nome'  => $user['nome'],
            'email' => $user['email'],
            'role'  => $user['role'],
            'exp'   => time() + (60 * 60 * 8)
        ];

        $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        Response::json([
            'token' => 'Bearer ' . $token
        ]);
    }
}
