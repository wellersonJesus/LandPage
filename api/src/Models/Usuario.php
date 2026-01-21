<?php namespace App\Models;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Usuario",
 *     required={"nome", "email", "role"},
 *     @OA\Property(property="id", type="integer"),
 *     @OA\Property(property="nome", type="string"),
 *     @OA\Property(property="email", type="string"),
 *     @OA\Property(property="role", type="string", enum={"admin", "user", "gestor", "financeiro"}),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class Usuario extends BaseModel {
    protected $table = 'USUARIO';
}