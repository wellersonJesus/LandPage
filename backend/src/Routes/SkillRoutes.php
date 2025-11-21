<?php

require_once __DIR__ . '/../controllers/SkillController.php';
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

// Captura método e caminho
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove prefixo /skill
$prefix = '/skill';
$path = substr($uri, strlen($prefix));

// Middleware JWT
$verifyToken = function() {
    AuthMiddleware::verifyToken();
};

// ----------------------------
// Rotas principais de Skill
// ----------------------------
if ($method === 'GET' && ($path === '' || $path === '/')) {
    $verifyToken();
    SkillController::getAllSkills();
}

if ($method === 'GET' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    SkillController::getSkillById($matches[1]);
}

if ($method === 'POST' && ($path === '' || $path === '/')) {
    $verifyToken();
    SkillController::createSkill();
}

if ($method === 'PUT' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    SkillController::updateSkill($matches[1]);
}

if ($method === 'DELETE' && preg_match('#^/(\d+)$#', $path, $matches)) {
    $verifyToken();
    SkillController::deleteSkill($matches[1]);
}
