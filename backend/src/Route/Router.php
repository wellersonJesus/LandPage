<?php

namespace App\Route;

use App\Http\Response;

class Router
{
    private array $routes = [];

    public function add(string $method, string $path, callable $handler): void
    {
        $this->routes[] = compact('method', 'path', 'handler');
    }

    public function dispatch(string $uri, string $method): void
    {
        foreach ($this->routes as $route) {

            $pattern = preg_replace('#\{([\w]+)\}#', '([\w-]+)', $route['path']);
            $pattern = "#^{$pattern}$#";

            if ($route['method'] === $method && preg_match($pattern, $uri, $matches)) {
                array_shift($matches);
                call_user_func_array($route['handler'], $matches);
                return;
            }
        }

        Response::error('Rota não encontrada', 404);
    }
}
