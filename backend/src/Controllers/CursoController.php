<?php

namespace App\Controllers;

use PDO;

class CursoController
{
    private PDO $db;

    public function __construct(PDO $pdo)
    {
        $this->db = $pdo;
    }

    public function index()
    {
        $stmt = $this->db->query("SELECT * FROM curso");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function show($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM curso WHERE id = ?");
        $stmt->execute([$id]);

        $curso = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$curso) {
            http_response_code(404);
            echo json_encode(["error" => "Curso não encontrado"]);
            return;
        }

        echo json_encode($curso);
    }

    public function store($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO curso (nome, plataforma_id, carga_horaria, progresso)
             VALUES (?, ?, ?, ?)"
        );

        $stmt->execute([
            $data['nome'],
            $data['plataforma_id'],
            $data['carga_horaria'],
            $data['progresso'] ?? 0
        ]);

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            ...$data
        ]);
    }

    public function update($id, $data)
    {
        $stmt = $this->db->prepare(
            "UPDATE curso 
             SET nome=?, plataforma_id=?, carga_horaria=?, progresso=?
             WHERE id=?"
        );

        $stmt->execute([
            $data['nome'],
            $data['plataforma_id'],
            $data['carga_horaria'],
            $data['progresso'],
            $id
        ]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Curso não encontrado"]);
            return;
        }

        echo json_encode(["id" => $id, ...$data]);
    }

    public function destroy($id)
    {
        $stmt = $this->db->prepare("DELETE FROM curso WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Curso não encontrado"]);
            return;
        }

        echo json_encode(["message" => "Curso deletado com sucesso"]);
    }
}
