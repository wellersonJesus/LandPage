<?php

namespace App\Controllers;

use App\Database\Database;
use OpenApi\Annotations as OA;
use PDO;
use PDOException;
use Firebase\JWT\JWT;
use Dotenv\Dotenv;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Endpoints de autenticação e gerenciamento de usuários"
 * )
 */
class AuthController
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;

        // Carrega .env apenas uma vez (caso ainda não esteja carregado)
        if (!isset($_ENV['JWT_SECRET'])) {
            $dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
            $dotenv->safeLoad();
        }

        $this->createAdminIfNotExists();
    }

    /**
     * =========================================================
     * Criar usuário admin inicial se não existir
     * =========================================================
     */
    private function createAdminIfNotExists(): void
    {
        $email = $_ENV['ADMIN_EMAIL'] ?? null;
        $senha = $_ENV['ADMIN_PASSWORD'] ?? null;

        if (!$email || !$senha) {
            return;
        }

        try {
            $stmt = $this->db->prepare("SELECT id FROM usuario WHERE email = ?");
            $stmt->execute([$email]);

            if (!$stmt->fetch()) {
                $hashed = password_hash($senha, PASSWORD_DEFAULT);

                $stmt = $this->db->prepare(
                    "INSERT INTO usuario (nome, email, senha, role)
                     VALUES (?, ?, ?, ?)"
                );

                $stmt->execute(['Admin', $email, $hashed, 'admin']);
            }

        } catch (PDOException $e) {
            error_log('Erro ao criar admin: ' . $e->getMessage());
        }
    }

    /**
     * =========================================================
     * Criar usuário
     * =========================================================
     *
     * @OA\Post(
     *     path="/auth/usuarios",
     *     summary="Cria um novo usuário",
     *     tags={"Auth"}
     * )
     */
    public function createUsuario(): void
    {
        $this->sendJsonHeaders();

        $body = json_decode(file_get_contents('php://input'), true);

        $nome  = $body['nome']  ?? null;
        $email = $body['email'] ?? null;
        $senha = $body['senha'] ?? null;
        $role  = $body['role']  ?? null;

        $finalSenha = $senha ?: (
            $role === 'admin'
                ? ($_ENV['ADMIN_PASSWORD'] ?? null)
                : ($_ENV['USER_PASSWORD'] ?? 'user123')
        );

        if (!$nome || !$email || !$role || !$finalSenha) {
            http_response_code(400);
            echo json_encode(['error' => 'Campos obrigatórios ausentes']);
            return;
        }

        try {
            $stmt = $this->db->prepare(
                "INSERT INTO usuario (nome, email, senha, role)
                 VALUES (?, ?, ?, ?)"
            );

            $stmt->execute([
                $nome,
                $email,
                password_hash($finalSenha, PASSWORD_DEFAULT),
                $role
            ]);

            http_response_code(201);
            echo json_encode([
                'id'    => $this->db->lastInsertId(),
                'nome'  => $nome,
                'email' => $email,
                'role'  => $role
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao criar usuário']);
        }
    }

    /**
     * =========================================================
     * Listar usuários
     * =========================================================
     *
     * @OA\Get(
     *     path="/auth/usuarios",
     *     summary="Lista usuários",
     *     tags={"Auth"}
     * )
     */
    public function listUsuarios(): void
    {
        $this->sendJsonHeaders();

        try {
            $stmt = $this->db->query(
                "SELECT id, nome, email, role FROM usuario"
            );

            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao listar usuários']);
        }
    }

    /**
     * =========================================================
     * Login
     * =========================================================
     *
     * @OA\Post(
     *     path="/auth/login",
     *     summary="Login e geração de JWT",
     *     tags={"Auth"}
     * )
     */
    public function login(): void
    {
        $this->sendJsonHeaders();

        $body = json_decode(file_get_contents('php://input'), true);

        $email = $body['email'] ?? null;
        $senha = $body['password'] ?? null;

        if (!$email || !$senha) {
            http_response_code(400);
            echo json_encode(['error' => 'Email e senha obrigatórios']);
            return;
        }

        try {
            $stmt = $this->db->prepare(
                "SELECT * FROM usuario WHERE email = ?"
            );
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($senha, $user['senha'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Credenciais inválidas']);
                return;
            }

            $payload = [
                'id'    => $user['id'],
                'nome'  => $user['nome'],
                'email' => $user['email'],
                'role'  => $user['role'],
                'exp'   => time() + 60 * 60 * 8
            ];

            $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

            echo json_encode([
                'message' => 'Login realizado com sucesso',
                'token'   => 'Bearer ' . $token
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erro no login']);
        }
    }

    /**
     * Headers padrão
     */
    private function sendJsonHeaders(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
