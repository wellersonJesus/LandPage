<?php namespace App\Controllers;

use App\Models\Empresa;

class EmpresaController extends BaseController {
    public function __construct() {
        $this->model = new Empresa();
    }
}