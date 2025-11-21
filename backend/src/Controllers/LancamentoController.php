<?php

class LancamentoController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db; // Conexão PDO
    }

    // Listar todos os Lançamentos
    public function getAllLancamentos()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Lancamento");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($rows);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Buscar Lançamento por ID
    public function getLancamentoById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Lancamento WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["error" => "Lançamento não encontrado"]);
                return;
            }

            echo json_encode($row);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Criar novo Lançamento
    public function createLancamento($data)
    {
        try {
            $sql = "INSERT INTO Lancamento (data, descricao, tipo, valor, categoria, conta_id)
                    VALUES (?, ?, ?, ?, ?, ?)";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data['data'],
                $data['descricao'],
                $data['tipo'],
                $data['valor'],
                $data['categoria'],
                $data['conta_id']
            ]);

            $id = $this->db->lastInsertId();

            http_response_code(201);
            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Atualizar Lançamento
    public function updateLancamento($id, $data)
    {
        try {
            $sql = "UPDATE Lancamento SET 
                        data = ?,
                        descricao = ?,
                        tipo = ?,
                        valor = ?,
                        categoria = ?,
                        conta_id = ?
                    WHERE id = ?";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data['data'],
                $data['descricao'],
                $data['tipo'],
                $data['valor'],
                $data['categoria'],
                $data['conta_id'],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Lançamento não encontrado"]);
                return;
            }

            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Deletar Lançamento
    public function deleteLancamento($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Lancamento WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Lançamento não encontrado"]);
                return;
            }

            echo json_encode(["message" => "Lançamento deletado com sucesso"]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
