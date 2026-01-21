<?php namespace App\Controllers;

use App\Models\Contrato;

class ContratoController extends BaseController {
    public function __construct() {
        $this->model = new Contrato();
    }
}