<?php

namespace App\Controllers;

use App\Database\Database;
use PDO;
use PDOException;

class SkillController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    // ---------------------------------------------------------
    // Listar todas as Skills
    // ---------------------------------------------------------
    public function getAllSkills()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Skill");
            $skills = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($skills);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Buscar Skill por ID
    // ---------------------------------------------------------
    public function getSkillById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Skill WHERE id = ?");
            $stmt->execute([$id]);

            $skill = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$skill) {
                http_response_code(404);
                echo json_encode(["error" => "Skill não encontrada"]);
                return;
            }

            echo json_encode($skill);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Criar nova Skill
    // ---------------------------------------------------------
    public function createSkill()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "INSERT INTO Skill (nome, nivel, categoria)
                VALUES (?, ?, ?)";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data["nome"],
                $data["nivel"],
                $data["categoria"]
            ]);

            $id = $this->db->lastInsertId();

            http_response_code(201);
            echo json_encode([
                "id" => $id,
                ...$data
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Atualizar Skill
    // ---------------------------------------------------------
    public function updateSkill($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "UPDATE Skill
                SET nome = ?, nivel = ?, categoria = ?
                WHERE id = ?";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data["nome"],
                $data["nivel"],
                $data["categoria"],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Skill não encontrada"]);
                return;
            }

            echo json_encode([
                "id" => $id,
                ...$data
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Deletar Skill
    // ---------------------------------------------------------
    public function deleteSkill($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Skill WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Skill não encontrada"]);
                return;
            }

            echo json_encode(["message" => "Skill deletada com sucesso"]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
