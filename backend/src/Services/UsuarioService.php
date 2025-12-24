<?php

namespace App\Services;

use PDO;

class UsuarioService
{
    public function __construct(private PDO $db) {}

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            "INSERT INTO usuario (nome, email, senha, role)
             VALUES (?, ?, ?, ?)"
        );

        $stmt->execute([
            $data['nome'],
            $data['email'],
            password_hash($data['senha'], PASSWORD_DEFAULT),
            $data['role']
        ]);

        return (int)$this->db->lastInsertId();
    }

    public function listAll(): array
    {
        return $this->db
            ->query("SELECT id, nome, email, role FROM usuario")
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $values = [];

        foreach (['nome', 'email', 'role'] as $f) {
            if (isset($data[$f])) {
                $fields[] = "$f = ?";
                $values[] = $data[$f];
            }
        }

        if (isset($data['senha'])) {
            $fields[] = "senha = ?";
            $values[] = password_hash($data['senha'], PASSWORD_DEFAULT);
        }

        if (!$fields) return false;

        $values[] = $id;

        $stmt = $this->db->prepare(
            "UPDATE usuario SET " . implode(',', $fields) . " WHERE id = ?"
        );

        return $stmt->execute($values);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare(
            "DELETE FROM usuario WHERE id = ?"
        );
        return $stmt->execute([$id]);
    }
}
