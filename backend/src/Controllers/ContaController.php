<?php

class ContaController {

    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    // Listar todas as contas
    public function getAllContas()
    {
        $stmt = $this->db->query("SELECT * FROM Conta");
        $contas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($contas);
    }

    // Buscar conta por ID
    public function getContaById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Conta WHERE id = ?");
        $stmt->execute([$id]);
        $conta = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$conta) {
            http_response_code(404);
            echo json_encode(["error" => "Conta não encontrada"]);
            return;
        }

        echo json_encode($conta);
    }

    // Criar nova conta
    public function createConta($data)
    {
        $sql = "INSERT INTO Conta (nome, banco, tipo, saldo, agencia, numero_conta) 
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["banco"],
            $data["tipo"],
            $data["saldo"],
            $data["agencia"],
            $data["numero_conta"]
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar conta"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            ...$data
        ]);
    }

    // Atualizar conta
    public function updateConta($id, $data)
    {
        $sql = "UPDATE Conta SET 
                    nome = ?, 
                    banco = ?, 
                    tipo = ?, 
                    saldo = ?, 
                    agencia = ?, 
                    numero_conta = ?
                WHERE id = ?";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["banco"],
            $data["tipo"],
            $data["saldo"],
            $data["agencia"],
            $data["numero_conta"],
            $id
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar conta"]);
            return;
        }

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Conta não encontrada"]);
            return;
        }

        echo json_encode(["id" => $id, ...$data]);
    }

    // Deletar conta
    public function deleteConta($id)
    {
        $stmt = $this->db->prepare("DELETE FROM Conta WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Conta não encontrada"]);
            return;
        }

        echo json_encode(["message" => "Conta deletada com sucesso"]);
    }
}
