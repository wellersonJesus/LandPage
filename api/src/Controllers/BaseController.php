<?php

namespace App\Controllers;

class BaseController {
    protected $model;

    public function index() {
        $data = $this->model->getAll();
        echo json_encode($data);
    }

    public function show($id) {
        $data = $this->model->find($id);
        if ($data) {
            echo json_encode($data);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Registro não encontrado"]);
        }
    }

    public function store() {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($data) {
            try {
                $id = $this->model->create($data);
                http_response_code(201);
                echo json_encode(["message" => "Criado com sucesso", "id" => $id]);
            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos"]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($data) {
            try {
                $this->model->update($id, $data);
                echo json_encode(["message" => "Atualizado com sucesso"]);
            } catch (\Exception $e) {
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos"]);
        }
    }

    public function delete($id) {
        try {
            $this->model->delete($id);
            echo json_encode(["message" => "Deletado com sucesso"]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}