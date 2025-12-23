<?php

namespace App\Controllers;

use PDO;

class EmpresaController
{
    private PDO $db;

    public function __construct(PDO $pdo)
    {
        $this->db = $pdo;
    }

    public function getAllEmpresas(): void
    {
        $stmt = $this->db->query("SELECT * FROM empresa");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function getEmpresaById(int $id): void
    {
        $stmt = $this->db->prepare("SELECT * FROM empresa WHERE id = ?");
        $stmt->execute([$id]);
        $empresa = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$empresa) {
            http_response_code(404);
            echo json_encode(['error' => 'Empresa não encontrada']);
            return;
        }

        echo json_encode($empresa);
    }

    public function createEmpresa(array $data): void
    {
        $sql = "INSERT INTO empresa 
            (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            $data['nome'],
            $data['slogan'],
            $data['descricao'],
            $data['cnpj'],
            $data['atividade'],
            $data['localizacao'],
            $data['missao'],
            $data['servicos'],
            $data['projetos_destaque']
        ]);

        http_response_code(201);
        echo json_encode([
            'id' => $this->db->lastInsertId(),
            ...$data
        ]);
    }

    public function updateEmpresa(int $id, array $data): void
    {
        $sql = "UPDATE empresa SET
            nome=?, slogan=?, descricao=?, cnpj=?, atividade=?,
            localizacao=?, missao=?, servicos=?, projetos_destaque=?
            WHERE id=?";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
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
        ]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Empresa não encontrada']);
            return;
        }

        echo json_encode(['id' => $id, ...$data]);
    }

    public function deleteEmpresa(int $id): void
    {
        $stmt = $this->db->prepare("DELETE FROM empresa WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Empresa não encontrada']);
            return;
        }

        echo json_encode(['message' => 'Empresa deletada com sucesso']);
    }
}
