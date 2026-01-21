<?php namespace App\Controllers;

use App\Models\Usuario;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name="Usuarios", description="Gerenciamento de usuários")
 *
 * @OA\Get(
 *     path="/api/usuarios",
 *     tags={"Usuarios"},
 *     summary="Lista todos os usuários",
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="Lista de usuários",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Usuario"))
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/usuarios",
 *     tags={"Usuarios"},
 *     summary="Cria um novo usuário",
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/Usuario")
 *     ),
 *     @OA\Response(response=201, description="Usuário criado")
 * )
 *
 * @OA\Get(
 *     path="/api/usuarios/{id}",
 *     tags={"Usuarios"},
 *     summary="Busca um usuário por ID",
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Dados do usuário", @OA\JsonContent(ref="#/components/schemas/Usuario")),
 *     @OA\Response(response=404, description="Não encontrado")
 * )
 *
 * @OA\Put(
 *     path="/api/usuarios/{id}",
 *     tags={"Usuarios"},
 *     summary="Atualiza um usuário",
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Usuario")),
 *     @OA\Response(response=200, description="Atualizado com sucesso")
 * )
 *
 * @OA\Delete(
 *     path="/api/usuarios/{id}",
 *     tags={"Usuarios"},
 *     summary="Remove um usuário",
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Deletado com sucesso")
 * )
 */
class UsuarioController extends BaseController {
    public function __construct() {
        $this->model = new Usuario();
    }
}