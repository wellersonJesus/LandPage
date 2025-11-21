<?php

class EmprestimoController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    // Listar todas os empréstimos
    public function getAllEmprestimos()
    {
        $stmt = $this->db->prepare("SELECT * FROM Emprestimo");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // Buscar empréstimo por ID
    public function getEmprestimoById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Emprestimo WHERE id = ?");
        $stmt->execute([$id]);
        $emprestimo = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$emprestimo) {
            http_response_code(404);
            echo json_encode(["error" => "Emprestimo não encontrado"]);
            return;
        }

        echo json_encode($emprestimo);
    }

    // Criar novo empréstimo
    public function createEmprestimo($data)
    {
        $sql = "
            INSERT INTO Emprestimo (
                cnpj, descricao, valor_total, valor_pago, valor_a_pagar,
                data_parcela, numero_parcela, valor_parcela
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ";

        $stmt = $this->db->prepare($sql);

        $params = [
            $data['cnpj'],
            $data['descricao'],
            $data['valor_total'],
            $data['valor_pago'],
            $data['valor_a_pagar'],
            $data['data_parcela'],
            $data['numero_parcela'],
            $data['valor_parcela']
        ];

        if ($stmt->execute($params)) {
            http_response_code(201);
            echo json_encode([
                "id" => $this->db->lastInsertId(),
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar empréstimo"]);
        }
    }

    // Atualizar empréstimo
    public function updateEmprestimo($id, $data)
    {
        $sql = "
            UPDATE Emprestimo SET
                cnpj = ?, descricao = ?, valor_total = ?, valor_pago = ?, 
                valor_a_pagar = ?, data_parcela = ?, numero_parcela = ?, valor_parcela = ?
            WHERE id = ?
        ";

        $params = [
            $data['cnpj'],
            $data['descricao'],
            $data['valor_total'],
            $data['valor_pago'],
            $data['valor_a_pagar'],
            $data['data_parcela'],
            $data['numero_parcela'],
            $data['valor_parcela'],
            $id
        ];

        $stmt = $this->db->prepare($sql);

        if ($stmt->execute($params)) {
            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Emprestimo não encontrado"]);
                return;
            }

            echo json_encode([
                "id" => $id,
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar empréstimo"]);
        }
    }

    // Deletar empréstimo
    public function deleteEmprestimo($id)
    {
        $stmt = $this->db->prepare("DELETE FROM Emprestimo WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Emprestimo não encontrado"]);
            return;
        }

        echo json_encode(["message" => "Emprestimo deletado com sucesso"]);
    }
}
