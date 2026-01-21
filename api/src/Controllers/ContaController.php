<?php namespace App\Controllers;

use App\Models\Conta;

class ContaController extends BaseController {
    public function __construct() {
        $this->model = new Conta();
    }
}