<?php

namespace App\Config;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="API Landpage",
 *     version="1.0.0",
 *     description="API para gestão de operações da Landpage"
 * )
 * @OA\Server(
 *     url="http://localhost:8000",
 *     description="Servidor Local"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class SwaggerConfig {}