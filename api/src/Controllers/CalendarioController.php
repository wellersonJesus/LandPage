<?php namespace App\Controllers;

use App\Models\Calendario;

class CalendarioController extends BaseController {
    public function __construct() {
        $this->model = new Calendario();
    }
}