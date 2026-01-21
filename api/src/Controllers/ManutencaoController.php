<?php namespace App\Controllers;

use App\Models\Manutencao;

class ManutencaoController extends BaseController {
    public function __construct() {
        $this->model = new Manutencao();
    }
}