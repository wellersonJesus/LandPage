<?php namespace App\Controllers;

use App\Models\Investimento;

class InvestimentoController extends BaseController {
    public function __construct() {
        $this->model = new Investimento();
    }
}