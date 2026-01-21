<?php

namespace App;

use App\Config\AuthMiddleware;

class Router {
    private $routes = [];

    public function add($method, $path, $controller, $action, $middleware = []) {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'controller' => $controller,
            'action' => $action,
            'middleware' => $middleware
        ];
    }

    public function resource($path, $controller, $middleware = []) {
        $this->add('GET', $path, $controller, 'index', $middleware);
        $this->add('GET', $path . '/{id}', $controller, 'show', $middleware);
        $this->add('POST', $path, $controller, 'store', $middleware);
        $this->add('PUT', $path . '/{id}', $controller, 'update', $middleware);
        $this->add('DELETE', $path . '/{id}', $controller, 'delete', $middleware);
    }

    public function dispatch($method, $uri) {
        $uri = parse_url($uri, PHP_URL_PATH);
        // Log para debug no terminal
        error_log("Router Dispatch: Recebido [$method] $uri");
        
        foreach ($this->routes as $route) {
            // Converte {id} para regex
            $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9_]+)', $route['path']);
            $pattern = "#^" . $pattern . "$#";

            if ($route['method'] === $method && preg_match($pattern, $uri, $matches)) {
                array_shift($matches); // Remove o match completo
                
                // Executa Middleware se existir
                if (!empty($route['middleware'])) {
                    $auth = new AuthMiddleware();
                    // Assume que o middleware é sempre de Auth por enquanto e passa as roles
                    $roles = $route['middleware']['roles'] ?? [];
                    $auth->handle($roles);
                }

                $controllerName = $route['controller'];
                // Se não contiver namespace completo (barra invertida), assume que é um Controller padrão
                if (strpos($controllerName, '\\') === false) {
                    $controllerName = "App\\Controllers\\" . $controllerName;
                }

                if (class_exists($controllerName)) {
                    error_log("Router: Rota encontrada. Controller: $controllerName, Action: {$route['action']}");
                    $controller = new $controllerName();
                    $action = $route['action'];
                    call_user_func_array([$controller, $action], $matches);
                    return;
                } else {
                    error_log("Router Erro: Classe Controller '$controllerName' não encontrada. Verifique o namespace ou composer dump-autoload.");
                }
            }
        }

        error_log("Router Erro: Nenhuma rota encontrada para [$method] $uri");
        http_response_code(404);
        echo json_encode(["message" => "Rota não encontrada"]);
    }
}