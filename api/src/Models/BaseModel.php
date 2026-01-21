<?php

namespace App\Models;

use App\Database\Database;
use PDO;

abstract class BaseModel {
    protected $pdo;
    protected $table;

    public function __construct() {
        $this->pdo = Database::getConnection();
    }

    public function getAll() {
        $stmt = $this->pdo->query("SELECT * FROM " . $this->table);
        return $stmt->fetchAll();
    }

    public function find($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM " . $this->table . " WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create(array $data) {
        $columns = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));
        
        $sql = "INSERT INTO " . $this->table . " ($columns) VALUES ($placeholders)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);
        return $this->pdo->lastInsertId();
    }

    public function update($id, array $data) {
        $fields = "";
        foreach ($data as $key => $value) {
            $fields .= "$key = :$key, ";
        }
        $fields = rtrim($fields, ", ");
        
        $data['id'] = $id;
        
        $sql = "UPDATE " . $this->table . " SET $fields WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($data);
    }

    public function delete($id) {
        $stmt = $this->pdo->prepare("DELETE FROM " . $this->table . " WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}