<?php

class EmpresaController
{
    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    // Listar todas as empresas
    public function getAllEmpresas()
    {
        $stmt = $this->db->prepare("SELECT * FROM empresa");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // Buscar empresa por ID
    public function getEmpresaById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM empresa WHERE id = ?");
        $stmt->execute([$id]);
        $empresa = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$empresa) {
            http_response_code(404);
            echo json_encode(["error" => "Empresa não encontrada"]);
            return;
        }

        echo json_encode($empresa);
    }

    // Criar nova empresa
    public function createEmpresa($data)
    {
        $sql = "INSERT INTO empresa (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);
        $params = [
            $data['nome'],
            $data['slogan'],
            $data['descricao'],
            $data['cnpj'],
            $data['atividade'],
            $data['localizacao'],
            $data['missao'],
            $data['servicos'],
            $data['projetos_destaque']
        ];

        if ($stmt->execute($params)) {
            http_response_code(201);
            echo json_encode([
                "id" => $this->db->lastInsertId(),
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar empresa"]);
        }
    }

    // Atualizar empresa
    public function updateEmpresa($id, $data)
    {
        $sql = "UPDATE empresa SET 
                    nome=?, slogan=?, descricao=?, cnpj=?, atividade=?, 
                    localizacao=?, missao=?, servicos=?, projetos_destaque=?
                WHERE id=?";

        $stmt = $this->db->prepare($sql);
        $params = [
            $data['nome'],
            $data['slogan'],
            $data['descricao'],
            $data['cnpj'],
            $data['atividade'],
            $data['localizacao'],
            $data['missao'],
            $data['servicos'],
            $data['projetos_destaque'],
            $id
        ];

        if ($stmt->execute($params)) {
            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["error" => "Empresa não encontrada"]);
                return;
            }

            echo json_encode([
                "id" => $id,
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar empresa"]);
        }
    }

    // Deletar empresa
    public function deleteEmpresa($id)
    {
        $stmt = $this->db->prepare("DELETE FROM empresa WHERE id=?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Empresa não encontrada"]);
            return;
        }

        echo json_encode(["message" => "Empresa deletada com sucesso"]);
    }

    // Listar contratos de uma empresa
    public function getContratosByEmpresa($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM contrato WHERE empresa_id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // Criar contrato vinculado a empresa
    public function createContratoByEmpresa($empresa_id, $data)
    {
        $sql = "INSERT INTO contrato (empresa_id, descricao, valor, data_inicio, data_fim, status)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);
        $params = [
            $empresa_id,
            $data['descricao'],
            $data['valor'],
            $data['data_inicio'],
            $data['data_fim'],
            $data['status']
        ];

        if ($stmt->execute($params)) {
            http_response_code(201);
            echo json_encode([
                "id" => $this->db->lastInsertId(),
                "empresa_id" => $empresa_id,
                ...$data
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar contrato"]);
        }
    }
}
