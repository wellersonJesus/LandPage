<?php namespace App\Controllers;

use App\Models\Usuario;

class UsuarioController extends BaseController {
    public function __construct() {
        $this->model = new Usuario();
    }
}