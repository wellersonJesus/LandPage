<?php namespace App\Controllers;

use App\Models\Dispositivo;

class DispositivoController extends BaseController {
    public function __construct() {
        $this->model = new Dispositivo();
    }
}