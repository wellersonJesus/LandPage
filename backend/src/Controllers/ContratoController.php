<?php

namespace App\Controllers;

use PDO;
use App\Http\Response;

class ContratoController
{
    public function __construct(private PDO $db) {}

    // ========================
    // LISTAR CONTRATOS
    // ========================
    public function getAll(): void
    {
        $stmt = $this->db->query("SELECT * FROM Contrato");
        Response::json($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // ========================
    // BUSCAR POR ID
    // ========================
    public function getById(int $id): void
    {
        $stmt = $this->db->prepare("SELECT * FROM Contrato WHERE id = ?");
        $stmt->execute([$id]);

        $contrato = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$contrato) {
            Response::error('Contrato não encontrado', 404);
        }

        Response::json($contrato);
    }

    // ========================
    // CRIAR CONTRATO
    // ========================
    public function create(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->db->prepare(
            "INSERT INTO Contrato 
             (empresa_id, descricao, valor, data_inicio, data_fim, status)
             VALUES (?, ?, ?, ?, ?, ?)"
        );

        $stmt->execute([
            $data['empresa_id'],
            $data['descricao'],
            $data['valor'],
            $data['data_inicio'],
            $data['data_fim'],
            $data['status']
        ]);

        Response::json(['id' => $this->db->lastInsertId()], 201);
    }

    // ========================
    // ATUALIZAR CONTRATO
    // ========================
    public function update(int $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->db->prepare(
            "UPDATE Contrato SET
                empresa_id = ?,
                descricao  = ?,
                valor      = ?,
                data_inicio= ?,
                data_fim   = ?,
                status     = ?
             WHERE id = ?"
        );

        $stmt->execute([
            $data['empresa_id'],
            $data['descricao'],
            $data['valor'],
            $data['data_inicio'],
            $data['data_fim'],
            $data['status'],
            $id
        ]);

        if ($stmt->rowCount() === 0) {
            Response::error('Contrato não encontrado', 404);
        }

        Response::success('Contrato atualizado');
    }

    // ========================
    // DELETAR CONTRATO
    // ========================
    public function delete(int $id): void
    {
        $stmt = $this->db->prepare("DELETE FROM Contrato WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            Response::error('Contrato não encontrado', 404);
        }

        Response::success('Contrato removido');
    }

    // ========================
    // CONTAS
    // ========================
    public function getContas(int $id): void
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM conta WHERE contrato_id = ?"
        );
        $stmt->execute([$id]);

        Response::json($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function createConta(int $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->db->prepare(
            "INSERT INTO conta
             (contrato_id, tipo, numero_conta, agencia, saldo)
             VALUES (?, ?, ?, ?, ?)"
        );

        $stmt->execute([
            $id,
            $data['tipo'],
            $data['numero_conta'],
            $data['agencia'],
            $data['saldo']
        ]);

        Response::json(['id' => $this->db->lastInsertId()], 201);
    }

    // ========================
    // INVESTIMENTOS
    // ========================
    public function getInvestimentos(int $id): void
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM investimento WHERE contrato_id = ?"
        );
        $stmt->execute([$id]);

        Response::json($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function createInvestimento(int $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->db->prepare(
            "INSERT INTO investimento
             (contrato_id, tipo, descricao, valor_aplicado, rendimento, data_aplicacao)
             VALUES (?, ?, ?, ?, ?, ?)"
        );

        $stmt->execute([
            $id,
            $data['tipo'],
            $data['descricao'],
            $data['valor_aplicado'],
            $data['rendimento'],
            $data['data_aplicacao']
        ]);

        Response::json(['id' => $this->db->lastInsertId()], 201);
    }
}
