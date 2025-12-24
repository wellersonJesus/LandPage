<?php

namespace App\Controllers;

use App\Services\UsuarioService;
use App\Security\AuthGuard;
use App\Http\Response;
use PDO;

class UsuarioController
{
    private UsuarioService $service;

    public function __construct(PDO $db)
    {
        $this->service = new UsuarioService($db);
    }

    public function create(): void
    {
        AuthGuard::requireRole(['admin']);

        $body = json_decode(file_get_contents('php://input'), true);

        if (!isset($body['nome'], $body['email'], $body['role'])) {
            Response::error('Campos obrigatórios ausentes', 400);
        }

        $body['senha'] ??= $body['role'] === 'admin'
            ? $_ENV['ADMIN_PASSWORD']
            : $_ENV['USER_PASSWORD'];

        $id = $this->service->create($body);

        Response::json(['id' => $id], 201);
    }

    public function list(): void
    {
        AuthGuard::requireRole(['admin']);
        Response::json($this->service->listAll());
    }

    public function update(int $id): void
    {
        AuthGuard::requireRole(['admin']);

        $body = json_decode(file_get_contents('php://input'), true);

        if (empty($body)) {
            Response::error('Nada para atualizar', 400);
        }

        if (!$this->service->update($id, $body)) {
            Response::error('Usuário não encontrado', 404);
        }

        Response::success('Usuário atualizado');
    }

    public function delete(int $id): void
    {
        AuthGuard::requireRole(['admin']);

        if (!$this->service->delete($id)) {
            Response::error('Usuário não encontrado', 404);
        }

        Response::success('Usuário removido');
    }
}
