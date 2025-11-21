<?php

class PlataformaController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db; // Objeto PDO
    }

    // Listar todas as Plataformas
    public function getAllPlataformas()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Plataforma");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($rows);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Buscar Plataforma por ID
    public function getPlataformaById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Plataforma WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["error" => "Plataforma não encontrada"]);
                return;
            }

            echo json_encode($row);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Criar nova Plataforma
    public function createPlataforma($data)
    {
        try {
            $sql = "INSERT INTO Plataforma (nome, url, tipo) VALUES (?, ?, ?)";
            $stmt = $this->db->prepare($sql);

            $stmt->execute([
                $data['nome'],
                $data['url'],
                $data['tipo']
            ]);

            $id = $this->db->lastInsertId();

            http_response_code(201);
            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Atualizar Plataforma
    public function updatePlataforma($id, $data)
    {
        try {
            $sql = "UPDATE Plataforma 
                    SET nome = ?, url = ?, tipo = ?
                    WHERE id = ?";

            $stmt = $this->db->prepare($sql);

            $stmt->execute([
                $data['nome'],
                $data['url'],
                $data['tipo'],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Plataforma não encontrada"]);
                return;
            }

            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Deletar Plataforma
    public function deletePlataforma($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Plataforma WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Plataforma não encontrada"]);
                return;
            }

            echo json_encode(["message" => "Plataforma deletada com sucesso"]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
