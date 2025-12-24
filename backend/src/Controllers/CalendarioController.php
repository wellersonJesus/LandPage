<?php

namespace App\Controllers;

use PDO;
use App\Http\Response;

class CalendarioController
{
    public function __construct(private PDO $db) {}

    // ========================
    // GET ALL
    // ========================
    public function getAll(): void
    {
        $stmt = $this->db->query("SELECT * FROM Calendario");
        Response::json($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    // ========================
    // GET BY ID
    // ========================
    public function getById(int $id): void
    {
        $stmt = $this->db->prepare("SELECT * FROM Calendario WHERE id = ?");
        $stmt->execute([$id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            Response::error('Calendário não encontrado', 404);
        }

        Response::json($row);
    }

    // ========================
    // CREATE
    // ========================
    public function create(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->db->prepare(
            "INSERT INTO Calendario (data, dia_semana, mes, ano, feriado)
             VALUES (?, ?, ?, ?, ?)"
        );

        $stmt->execute([
            $data['data'],
            $data['dia_semana'],
            $data['mes'],
            $data['ano'],
            $data['feriado']
        ]);

        Response::json([
            'id' => $this->db->lastInsertId()
        ], 201);
    }

    // ========================
    // UPDATE
    // ========================
    public function update(int $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->db->prepare(
            "UPDATE Calendario
             SET data=?, dia_semana=?, mes=?, ano=?, feriado=?
             WHERE id=?"
        );

        $stmt->execute([
            $data['data'],
            $data['dia_semana'],
            $data['mes'],
            $data['ano'],
            $data['feriado'],
            $id
        ]);

        if ($stmt->rowCount() === 0) {
            Response::error('Calendário não encontrado', 404);
        }

        Response::success('Calendário atualizado');
    }

    // ========================
    // DELETE
    // ========================
    public function delete(int $id): void
    {
        $stmt = $this->db->prepare("DELETE FROM Calendario WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            Response::error('Calendário não encontrado', 404);
        }

        Response::success('Calendário removido');
    }
}
