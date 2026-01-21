<?php namespace App\Controllers;

use App\Models\Emprestimo;

class EmprestimoController extends BaseController {
    public function __construct() {
        $this->model = new Emprestimo();
    }
}