<?php

class ManutencaoController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db; // Conexão PDO
    }

    // Listar todas as Manutenções
    public function getAllManutencaos()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Manutencao");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($rows);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Buscar Manutenção por ID
    public function getManutencaoById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Manutencao WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["error" => "Manutenção não encontrada"]);
                return;
            }

            echo json_encode($row);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Criar nova Manutenção
    public function createManutencao($data)
    {
        try {
            $sql = "INSERT INTO Manutencao (dispositivo_id, data, descricao, custo, status)
                    VALUES (?, ?, ?, ?, ?)";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data['dispositivo_id'],
                $data['data'],
                $data['descricao'],
                $data['custo'],
                $data['status']
            ]);

            $id = $this->db->lastInsertId();

            http_response_code(201);
            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Atualizar Manutenção
    public function updateManutencao($id, $data)
    {
        try {
            $sql = "UPDATE Manutencao SET
                        dispositivo_id = ?,
                        data = ?,
                        descricao = ?,
                        custo = ?,
                        status = ?
                    WHERE id = ?";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data['dispositivo_id'],
                $data['data'],
                $data['descricao'],
                $data['custo'],
                $data['status'],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Manutenção não encontrada"]);
                return;
            }

            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Deletar Manutenção
    public function deleteManutencao($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Manutencao WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Manutenção não encontrada"]);
                return;
            }

            echo json_encode(["message" => "Manutenção deletada com sucesso"]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
