<?php namespace App\Controllers;

use App\Models\Lancamento;

class LancamentoController extends BaseController {
    public function __construct() {
        $this->model = new Lancamento();
    }
}