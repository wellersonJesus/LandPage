<?php

namespace App;

class Router {
    private $routes = [];

    public function add($method, $path, $controller, $action) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'controller' => $controller,
            'action' => $action
        ];
    }

    public function resource($path, $controller) {
        $this->add('GET', $path, $controller, 'index');
        $this->add('GET', $path . '/{id}', $controller, 'show');
        $this->add('POST', $path, $controller, 'store');
        $this->add('PUT', $path . '/{id}', $controller, 'update');
        $this->add('DELETE', $path . '/{id}', $controller, 'delete');
    }

    public function dispatch($method, $uri) {
        $uri = parse_url($uri, PHP_URL_PATH);
        
        foreach ($this->routes as $route) {
            // Converte {id} para regex
            $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9_]+)', $route['path']);
            $pattern = "#^" . $pattern . "$#";

            if ($route['method'] === $method && preg_match($pattern, $uri, $matches)) {
                array_shift($matches); // Remove o match completo
                
                $controllerName = "App\\Controllers\\" . $route['controller'];
                if (class_exists($controllerName)) {
                    $controller = new $controllerName();
                    $action = $route['action'];
                    call_user_func_array([$controller, $action], $matches);
                    return;
                }
            }
        }

        http_response_code(404);
        echo json_encode(["message" => "Rota não encontrada"]);
    }
}