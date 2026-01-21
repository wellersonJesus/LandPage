<?php namespace App\Controllers;

use App\Models\Servidor;

class ServidorController extends BaseController {
    public function __construct() {
        $this->model = new Servidor();
    }
}