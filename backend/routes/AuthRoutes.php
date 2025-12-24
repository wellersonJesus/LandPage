<?php

use App\Controllers\AuthController;

return function ($router, $db) {

    $controller = new AuthController($db);

    $router->add(
        'POST',
        '/auth/login',
        [$controller, 'login']
    );
};
