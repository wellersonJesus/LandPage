<?php

namespace App\Controllers;

class UsuarioController extends BaseController {
    protected $table = 'USUARIO';

    // Sobrescreve store para hash de senha
    public function store($data = null) {
        if ($data === null) {
            $data = json_decode(file_get_contents("php://input"), true);
        }
        if (isset($data['senha'])) {
            $data['senha'] = password_hash($data['senha'], PASSWORD_DEFAULT);
        }
        parent::store($data); 
    }

    public function update($id, $data = null) {
        if ($data === null) {
            $data = json_decode(file_get_contents("php://input"), true);
        }
        if (isset($data['senha'])) {
            $data['senha'] = password_hash($data['senha'], PASSWORD_DEFAULT);
        }
        parent::update($id, $data);
    }
}