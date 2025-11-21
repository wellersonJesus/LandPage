<?php

class ContratoController {

    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    /* ============================================================
        LISTAR TODOS OS CONTRATOS
    ============================================================ */
    public function getAllContratos()
    {
        $stmt = $this->db->query("SELECT * FROM Contrato");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /* ============================================================
        BUSCAR CONTRATO POR ID
    ============================================================ */
    public function getContratoById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Contrato WHERE id = ?");
        $stmt->execute([$id]);

        $contrato = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$contrato) {
            http_response_code(404);
            echo json_encode(["error" => "Contrato não encontrado"]);
            return;
        }

        echo json_encode($contrato);
    }

    /* ============================================================
        CRIAR CONTRATO
    ============================================================ */
    public function createContrato($data)
    {
        $sql = "INSERT INTO Contrato (empresa_id, descricao, valor, data_inicio, data_fim, status)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["empresa_id"],
            $data["descricao"],
            $data["valor"],
            $data["data_inicio"],
            $data["data_fim"],
            $data["status"]
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar contrato"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            ...$data
        ]);
    }

    /* ============================================================
        ATUALIZAR CONTRATO
    ============================================================ */
    public function updateContrato($id, $data)
    {
        $sql = "UPDATE Contrato SET 
                    empresa_id=?, 
                    descricao=?, 
                    valor=?, 
                    data_inicio=?, 
                    data_fim=?, 
                    status=?
                WHERE id=?";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["empresa_id"],
            $data["descricao"],
            $data["valor"],
            $data["data_inicio"],
            $data["data_fim"],
            $data["status"],
            $id
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar contrato"]);
            return;
        }

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Contrato não encontrado"]);
            return;
        }

        echo json_encode(["id" => $id, ...$data]);
    }

    /* ============================================================
        DELETAR CONTRATO
    ============================================================ */
    public function deleteContrato($id)
    {
        $stmt = $this->db->prepare("DELETE FROM Contrato WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Contrato não encontrado"]);
            return;
        }

        echo json_encode(["message" => "Contrato deletado com sucesso"]);
    }

    /* ============================================================
        LISTAR CONTAS VINCULADAS AO CONTRATO
    ============================================================ */
    public function getContasByContrato($id)
    {
        $sql = "SELECT * FROM conta WHERE contrato_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /* ============================================================
        CRIAR CONTA VINCULADA AO CONTRATO
    ============================================================ */
    public function createContaByContrato($id, $data)
    {
        $sql = "INSERT INTO conta (contrato_id, tipo, numero_conta, agencia, saldo)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $id,
            $data["tipo"],
            $data["numero_conta"],
            $data["agencia"],
            $data["saldo"]
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar conta vinculada"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            "contrato_id" => $id,
            ...$data
        ]);
    }

    /* ============================================================
        LISTAR INVESTIMENTOS DO CONTRATO
    ============================================================ */
    public function getInvestimentosByContrato($id)
    {
        $sql = "SELECT * FROM investimento WHERE contrato_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$id]);

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /* ============================================================
        CRIAR INVESTIMENTO VINCULADO AO CONTRATO
    ============================================================ */
    public function createInvestimentoByContrato($id, $data)
    {
        $sql = "INSERT INTO investimento 
                    (contrato_id, tipo, descricao, valor_aplicado, rendimento, data_aplicacao)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $id,
            $data["tipo"],
            $data["descricao"],
            $data["valor_aplicado"],
            $data["rendimento"],
            $data["data_aplicacao"]
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar investimento"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            "contrato_id" => $id,
            ...$data
        ]);
    }
}
