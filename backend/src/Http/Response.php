<?php

namespace App\Http;

class Response
{
    /**
     * Retorna uma resposta JSON padronizada
     */
    public static function json(
        array $data,
        int $status = 200,
        array $headers = []
    ): void {
        http_response_code($status);

        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');

        foreach ($headers as $key => $value) {
            header("$key: $value");
        }

        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Retorna erro padronizado
     */
    public static function error(
        string $message,
        int $status = 400,
        array $extra = []
    ): void {
        self::json(
            array_merge(['error' => $message], $extra),
            $status
        );
    }

    /**
     * Retorna sucesso sem payload
     */
    public static function success(
        string $message = 'Operação realizada com sucesso',
        int $status = 200
    ): void {
        self::json(['message' => $message], $status);
    }

    /**
     * Retorna resposta vazia (204 No Content)
     */
    public static function noContent(): void
    {
        http_response_code(204);
        exit;
    }
}
