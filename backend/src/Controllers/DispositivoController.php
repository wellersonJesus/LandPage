<?php

class DispositivoController {

    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    /* ============================================================
        LISTAR TODOS OS DISPOSITIVOS
    ============================================================ */
    public function getAllDispositivos()
    {
        $stmt = $this->db->query("SELECT * FROM Dispositivo");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /* ============================================================
        BUSCAR DISPOSITIVO POR ID
    ============================================================ */
    public function getDispositivoById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Dispositivo WHERE id = ?");
        $stmt->execute([$id]);
        
        $item = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$item) {
            http_response_code(404);
            echo json_encode(["error" => "Dispositivo não encontrado"]);
            return;
        }

        echo json_encode($item);
    }

    /* ============================================================
        CRIAR NOVO DISPOSITIVO
    ============================================================ */
    public function createDispositivo($data)
    {
        $sql = "INSERT INTO Dispositivo (nome, tipo, marca, modelo, numero_serie, status)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["tipo"],
            $data["marca"],
            $data["modelo"],
            $data["numero_serie"],
            $data["status"]
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar dispositivo"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            ...$data
        ]);
    }

    /* ============================================================
        ATUALIZAR DISPOSITIVO
    ============================================================ */
    public function updateDispositivo($id, $data)
    {
        $sql = "UPDATE Dispositivo SET 
                    nome=?, tipo=?, marca=?, modelo=?, numero_serie=?, status=?
                WHERE id=?";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["tipo"],
            $data["marca"],
            $data["modelo"],
            $data["numero_serie"],
            $data["status"],
            $id
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar dispositivo"]);
            return;
        }

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Dispositivo não encontrado"]);
            return;
        }

        echo json_encode(["id" => $id, ...$data]);
    }

    /* ============================================================
        DELETAR DISPOSITIVO
    ============================================================ */
    public function deleteDispositivo($id)
    {
        $stmt = $this->db->prepare("DELETE FROM Dispositivo WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Dispositivo não encontrado"]);
            return;
        }

        echo json_encode(["message" => "Dispositivo deletado com sucesso"]);
    }

    /* ============================================================
        LISTAR CONTAS DE UM DISPOSITIVO
    ============================================================ */
    public function getContasByDispositivo($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM conta WHERE dispositivo_id = ?");
        $stmt->execute([$id]);

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /* ============================================================
        CRIAR CONTA VINCULADA A UM DISPOSITIVO
    ============================================================ */
    public function createContaByDispositivo($id, $data)
    {
        $sql = "INSERT INTO conta (
                    nome, banco, tipo, saldo, agencia, numero_conta, contrato_id, dispositivo_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["banco"],
            $data["tipo"],
            $data["saldo"],
            $data["agencia"],
            $data["numero_conta"],
            $data["contrato_id"],
            $id
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar conta vinculada"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            "dispositivo_id" => $id,
            ...$data
        ]);
    }
}
