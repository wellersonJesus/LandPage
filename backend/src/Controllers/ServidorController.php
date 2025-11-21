<?php

namespace App\Controllers;

use App\Database\Database;
use PDO;
use PDOException;

class ServidorController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    // ---------------------------------------------------------
    // Listar todos os Servidores
    // ---------------------------------------------------------
    public function getAllServidores()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Servidor");
            $servidores = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($servidores);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Buscar Servidor por ID
    // ---------------------------------------------------------
    public function getServidorById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Servidor WHERE id = ?");
            $stmt->execute([$id]);
            $srv = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$srv) {
                http_response_code(404);
                echo json_encode(["error" => "Servidor não encontrado"]);
                return;
            }

            echo json_encode($srv);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Criar novo Servidor
    // ---------------------------------------------------------
    public function createServidor()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "INSERT INTO Servidor (nome, ip, sistema_operacional, status, localizacao)
                VALUES (?, ?, ?, ?, ?)";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data["nome"],
                $data["ip"],
                $data["sistema_operacional"],
                $data["status"],
                $data["localizacao"]
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
    // Atualizar Servidor
    // ---------------------------------------------------------
    public function updateServidor($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "UPDATE Servidor
                SET nome = ?, ip = ?, sistema_operacional = ?, status = ?, localizacao = ?
                WHERE id = ?";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data["nome"],
                $data["ip"],
                $data["sistema_operacional"],
                $data["status"],
                $data["localizacao"],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Servidor não encontrado"]);
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
    // Deletar Servidor
    // ---------------------------------------------------------
    public function deleteServidor($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Servidor WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Servidor não encontrado"]);
                return;
            }

            echo json_encode(["message" => "Servidor deletado com sucesso"]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Listar plataformas associadas a um servidor
    // ---------------------------------------------------------
    public function getPlataformasByServidor($id)
    {
        $sql = "
            SELECT p.*
            FROM plataforma p
            JOIN servidor_plataforma sp ON p.id = sp.plataforma_id
            WHERE sp.servidor_id = ?
        ";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([$id]);
            $plataformas = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($plataformas);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // ---------------------------------------------------------
    // Vincular plataforma a servidor
    // ---------------------------------------------------------
    public function createPlataformaByServidor($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $sql = "INSERT INTO servidor_plataforma (servidor_id, plataforma_id)
                VALUES (?, ?)";

        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $id,
                $data["plataforma_id"]
            ]);

            $lastId = $this->db->lastInsertId();

            http_response_code(201);
            echo json_encode([
                "id" => $lastId,
                "servidor_id" => $id,
                "plataforma_id" => $data["plataforma_id"]
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
