<?php namespace App\Controllers;

use App\Models\Gestao;

class GestaoController extends BaseController {
    public function __construct() {
        $this->model = new Gestao();
    }
}