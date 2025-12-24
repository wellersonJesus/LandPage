<?php

namespace App\Services;

use PDO;

class AuthService
{
    public function __construct(private PDO $db)
    {
        $this->bootstrapAdmin();
    }

    private function bootstrapAdmin(): void
    {
        $stmt = $this->db->prepare(
            "SELECT id FROM usuario WHERE email = ?"
        );
        $stmt->execute([$_ENV['ADMIN_EMAIL']]);

        if ($stmt->fetch()) {
            return;
        }

        $stmt = $this->db->prepare(
            "INSERT INTO usuario (nome, email, senha, role)
             VALUES (?, ?, ?, ?)"
        );

        $stmt->execute([
            'Administrador',
            $_ENV['ADMIN_EMAIL'],
            password_hash($_ENV['ADMIN_PASSWORD'], PASSWORD_DEFAULT),
            'admin'
        ]);
    }

    public function authenticate(string $email, string $password): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM usuario WHERE email = ?"
        );
        $stmt->execute([$email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($password, $user['senha'])) {
            return null;
        }

        return $user;
    }
}
