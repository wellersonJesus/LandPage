<?php

use App\Controllers\AuthController;

$controller = new AuthController();

$router->post('/auth/usuarios', [$controller, 'createUsuario']);
$router->get('/auth/usuarios', [$controller, 'listUsuarios']);
$router->post('/auth/login', [$controller, 'login']);
