<?php

namespace App\Controllers;

use App\Database\Database;
use PDO;
use PDOException;

class RedeController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    // -------------------------
    // Listar todas as Redes
    // -------------------------
    public function getAllRedes()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Rede");
            $redes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($redes);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // -------------------------
    // Buscar Rede por ID
    // -------------------------
    public function getRedeById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Rede WHERE id = ?");
            $stmt->execute([$id]);
            $rede = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$rede) {
                http_response_code(404);
                echo json_encode(["error" => "Rede não encontrada"]);
                return;
            }

            echo json_encode($rede);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // -------------------------
    // Criar nova Rede
    // -------------------------
    public function createRede()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "INSERT INTO Rede (nome, ip, mascara, gateway, dns, status)
                VALUES (?, ?, ?, ?, ?, ?)";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data["nome"],
                $data["ip"],
                $data["mascara"],
                $data["gateway"],
                $data["dns"],
                $data["status"]
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

    // -------------------------
    // Atualizar Rede
    // -------------------------
    public function updateRede($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "UPDATE Rede SET 
                    nome = ?, 
                    ip = ?, 
                    mascara = ?, 
                    gateway = ?, 
                    dns = ?, 
                    status = ?
                WHERE id = ?";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data["nome"],
                $data["ip"],
                $data["mascara"],
                $data["gateway"],
                $data["dns"],
                $data["status"],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Rede não encontrada"]);
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

    // -------------------------
    // Deletar Rede
    // -------------------------
    public function deleteRede($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Rede WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Rede não encontrada"]);
                return;
            }

            echo json_encode(["message" => "Rede deletada com sucesso"]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
