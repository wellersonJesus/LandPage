<?php namespace App\Controllers;

use App\Models\Plataforma;

class PlataformaController extends BaseController {
    public function __construct() {
        $this->model = new Plataforma();
    }
}