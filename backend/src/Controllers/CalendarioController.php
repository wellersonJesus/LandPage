<?php
require_once __DIR__ . '/../db/connection.php';
require_once __DIR__ . '/../utils/jsonResponse.php';

class CalendarioController {

    // Listar todas
    public static function getAll() {
        $db = getDB();
        $stmt = $db->query("SELECT * FROM Calendario");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        jsonResponse($rows);
    }

    // Buscar por ID
    public static function getById($id) {
        $db = getDB();
        $stmt = $db->prepare("SELECT * FROM Calendario WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            jsonResponse(["error" => "Calendario não encontrado"], 404);
        }

        jsonResponse($row);
    }

    // Criar novo
    public static function create($data) {
        $db = getDB();
        $sql = "INSERT INTO Calendario (data, dia_semana, mes, ano, feriado)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = $db->prepare($sql);
        $stmt->execute([
            $data['data'],
            $data['dia_semana'],
            $data['mes'],
            $data['ano'],
            $data['feriado']
        ]);

        jsonResponse([
            "id" => $db->lastInsertId(),
            ...$data
        ], 201);
    }

    // Atualizar
    public static function update($id, $data) {
        $db = getDB();
        $sql = "UPDATE Calendario 
                SET data=?, dia_semana=?, mes=?, ano=?, feriado=?
                WHERE id=?";

        $stmt = $db->prepare($sql);
        $stmt->execute([
            $data['data'],
            $data['dia_semana'],
            $data['mes'],
            $data['ano'],
            $data['feriado'],
            $id
        ]);

        if ($stmt->rowCount() === 0) {
            jsonResponse(["error" => "Calendario não encontrado"], 404);
        }

        jsonResponse(["id" => $id, ...$data]);
    }

    // Deletar
    public static function delete($id) {
        $db = getDB();
        $stmt = $db->prepare("DELETE FROM Calendario WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            jsonResponse(["error" => "Calendario não encontrado"], 404);
        }

        jsonResponse(["message" => "Calendario deletado com sucesso"]);
    }
}
