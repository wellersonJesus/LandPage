<?php

class InvestimentoController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db; // Conexão PDO
    }

    // Listar todas as Investimentos
    public function getAllInvestimentos()
    {
        try {
            $stmt = $this->db->query("SELECT * FROM Investimento");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($rows);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Buscar Investimento por ID
    public function getInvestimentoById($id)
    {
        try {
            $stmt = $this->db->prepare("SELECT * FROM Investimento WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row) {
                http_response_code(404);
                echo json_encode(["error" => "Investimento não encontrado"]);
                return;
            }

            echo json_encode($row);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Criar novo Investimento
    public function createInvestimento($data)
    {
        try {
            $sql = "INSERT INTO Investimento (tipo, descricao, valor_aplicado, rendimento, data_aplicacao)
                    VALUES (?, ?, ?, ?, ?)";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data['tipo'],
                $data['descricao'],
                $data['valor_aplicado'],
                $data['rendimento'],
                $data['data_aplicacao']
            ]);

            $id = $this->db->lastInsertId();

            http_response_code(201);
            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Atualizar Investimento
    public function updateInvestimento($id, $data)
    {
        try {
            $sql = "UPDATE Investimento SET 
                        tipo = ?, 
                        descricao = ?, 
                        valor_aplicado = ?, 
                        rendimento = ?, 
                        data_aplicacao = ?
                    WHERE id = ?";

            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                $data['tipo'],
                $data['descricao'],
                $data['valor_aplicado'],
                $data['rendimento'],
                $data['data_aplicacao'],
                $id
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Investimento não encontrado"]);
                return;
            }

            echo json_encode(["id" => $id] + $data);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    // Deletar Investimento
    public function deleteInvestimento($id)
    {
        try {
            $stmt = $this->db->prepare("DELETE FROM Investimento WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Investimento não encontrado"]);
                return;
            }

            echo json_encode(["message" => "Investimento deletado com sucesso"]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
