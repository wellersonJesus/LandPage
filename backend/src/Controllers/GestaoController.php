<?php

class GestaoController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    // Listar todas as gestões
    public function getAllGestao()
    {
        $stmt = $this->db->prepare("SELECT * FROM gestao");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // Buscar gestão por ID
    public function getGestaoById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM gestao WHERE id = ?");
        $stmt->execute([$id]);
        $gestao = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$gestao) {
            http_response_code(404);
            echo json_encode(["error" => "Gestão não encontrada"]);
            return;
        }

        echo json_encode($gestao);
    }

    // Criar nova gestão
    public function createGestao($data)
    {
        $sql = "
            INSERT INTO gestao (
                data, km_percorrido, meta, horas_trabalhadas, 
                receita, despesa, lucro, conta_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ";

        $stmt = $this->db->prepare($sql);

        $params = [
            $data['data'],
            $data['km_percorrido'],
            $data['meta'],
            $data['horas_trabalhadas'],
            $data['receita'],
            $data['despesa'],
            $data['lucro'],
            $data['conta_id']
        ];

        if ($stmt->execute($params)) {
            http_response_code(201);
            echo json_encode([
                "id" => $this->db->lastInsertId(),
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar gestão"]);
        }
    }

    // Atualizar gestão
    public function updateGestao($id, $data)
    {
        $sql = "
            UPDATE gestao SET
                data = ?, km_percorrido = ?, meta = ?, horas_trabalhadas = ?, 
                receita = ?, despesa = ?, lucro = ?, conta_id = ?
            WHERE id = ?
        ";

        $params = [
            $data['data'],
            $data['km_percorrido'],
            $data['meta'],
            $data['horas_trabalhadas'],
            $data['receita'],
            $data['despesa'],
            $data['lucro'],
            $data['conta_id'],
            $id
        ];

        $stmt = $this->db->prepare($sql);

        if ($stmt->execute($params)) {
            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Gestão não encontrada"]);
                return;
            }

            echo json_encode([
                "id" => $id,
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar gestão"]);
        }
    }

    // Deletar gestão
    public function deleteGestao($id)
    {
        $stmt = $this->db->prepare("DELETE FROM gestao WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Gestão não encontrada"]);
            return;
        }

        echo json_encode(["message" => "Gestão deletada com sucesso"]);
    }

    // 🔹 Listar lançamentos por gestão
    public function getLancamentosByGestao($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM lancamento WHERE gestao_id = ?");
        $stmt->execute([$id]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum lançamento encontrado para esta gestão"]);
            return;
        }

        echo json_encode($rows);
    }

    // 🔹 Criar lançamento vinculado à gestão
    public function createLancamentoByGestao($id, $data)
    {
        $sql = "
            INSERT INTO lancamento (
                gestao_id, tipo, descricao, valor, data, categoria
            ) VALUES (?, ?, ?, ?, ?, ?)
        ";

        $stmt = $this->db->prepare($sql);

        $params = [
            $id,
            $data['tipo'],
            $data['descricao'],
            $data['valor'],
            $data['data'],
            $data['categoria']
        ];

        if ($stmt->execute($params)) {
            http_response_code(201);
            echo json_encode([
                "id" => $this->db->lastInsertId(),
                "gestao_id" => $id,
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar lançamento"]);
        }
    }
}
