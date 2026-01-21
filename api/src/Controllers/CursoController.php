<?php namespace App\Controllers;

use App\Models\Curso;

class CursoController extends BaseController {
    public function __construct() {
        $this->model = new Curso();
    }
}