<?php namespace App\Controllers;

use App\Models\Rede;

class RedeController extends BaseController {
    public function __construct() {
        $this->model = new Rede();
    }
}