<?php namespace App\Controllers;

use App\Models\Skill;

class SkillController extends BaseController {
    public function __construct() {
        $this->model = new Skill();
    }
}