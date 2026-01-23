<?php

namespace App\Controllers;

use App\Config\Database;
use PDO;

class BaseController {
    protected $pdo;
    protected $table;

    public function __construct() {
        $this->pdo = Database::getConnection();
    }

    public function index() {
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public function show($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    public function store($data = null) {
        if ($data === null) {
            $data = json_decode(file_get_contents("php://input"), true);
        }
        if (!$data) return;

        $columns = implode(", ", array_keys($data));
        $placeholders = implode(", ", array_fill(0, count($data), "?"));
        
        $sql = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";
        $stmt = $this->pdo->prepare($sql);
        
        if ($stmt->execute(array_values($data))) {
            http_response_code(201);
            echo json_encode(["message" => "Criado com sucesso", "id" => $this->pdo->lastInsertId()]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar registro"]);
        }
    }

    public function update($id, $data = null) {
        if ($data === null) {
            $data = json_decode(file_get_contents("php://input"), true);
        }
        if (!$data) return;

        $set = "";
        foreach ($data as $key => $value) {
            $set .= "$key = ?, ";
        }
        $set = rtrim($set, ", ");

        $sql = "UPDATE {$this->table} SET $set WHERE id = ?";
        $values = array_values($data);
        $values[] = $id;

        $stmt = $this->pdo->prepare($sql);
        if ($stmt->execute($values)) {
            echo json_encode(["message" => "Atualizado com sucesso"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar registro"]);
        }
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE id = ?");
        if ($stmt->execute([$id])) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(["message" => "Deletado com sucesso"]);
            } else {
                echo json_encode(["message" => "Registro não encontrado ou já deletado"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao deletar registro"]);
        }
    }
}