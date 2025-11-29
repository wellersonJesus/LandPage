<?php

namespace App\Controllers;

use OpenApi\Annotations as OA;
use PDO;
use PDOException;
use Firebase\JWT\JWT;

require_once __DIR__ . '/../databases/dbConnection.php';

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Endpoints de autenticação e gerenciamento de usuários"
 * )
 */
class AuthController
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();

        // Carrega variáveis do .env caso não estejam definidas
        if (!isset($_ENV['JWT_SECRET'])) {
            $dotenv = \Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
            $dotenv->load();
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

                $stmt = $this->db->prepare("
                    INSERT INTO usuario (nome, email, senha, role)
                    VALUES (?, ?, ?, ?)
                ");

                $stmt->execute(['Admin', $email, $hashed, 'admin']);
            }

        } catch (PDOException $e) {
            error_log("Erro ao criar usuário admin: " . $e->getMessage());
        }
    }

    /**
     * =========================================================
     * Criar usuário
     * =========================================================
     */

    /**
     * @OA\Post(
     *     path="/usuarios",
     *     summary="Cria um novo usuário",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nome","email","role"},
     *             @OA\Property(property="nome", type="string", example="João Silva"),
     *             @OA\Property(property="email", type="string", example="joao@email.com"),
     *             @OA\Property(property="senha", type="string", example="123456", nullable=true),
     *             @OA\Property(property="role", type="string", example="admin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Usuário criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer"),
     *             @OA\Property(property="nome", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="role", type="string")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Dados inválidos"),
     *     @OA\Response(response=500, description="Erro no servidor")
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

        // Senha padrão
        $finalSenha = $senha ?: (
            $role === 'admin'
                ? ($_ENV['ADMIN_PASSWORD'] ?? null)
                : ($_ENV['USER_PASSWORD'] ?? 'user123')
        );

        if (!$nome || !$email || !$role || !$finalSenha) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos os campos são obrigatórios']);
            return;
        }

        $hashed = password_hash($finalSenha, PASSWORD_DEFAULT);

        try {
            $stmt = $this->db->prepare("
                INSERT INTO usuario (nome, email, senha, role)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$nome, $email, $hashed, $role]);

            http_response_code(201);
            echo json_encode([
                'id'    => $this->db->lastInsertId(),
                'nome'  => $nome,
                'email' => $email,
                'role'  => $role
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * =========================================================
     * Listar usuários
     * =========================================================
     */

    /**
     * @OA\Get(
     *     path="/usuarios",
     *     summary="Lista todos os usuários",
     *     tags={"Auth"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de usuários",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="nome", type="string"),
     *                 @OA\Property(property="email", type="string"),
     *                 @OA\Property(property="role", type="string")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=500, description="Erro no servidor")
     * )
     */
    public function listUsuarios(): void
    {
        $this->sendJsonHeaders();

        try {
            $stmt = $this->db->query("SELECT id, nome, email, role FROM usuario");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * =========================================================
     * Login
     * =========================================================
     */

    /**
     * @OA\Post(
     *     path="/login",
     *     summary="Realiza login e retorna token JWT",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", example="admin@email.com"),
     *             @OA\Property(property="password", type="string", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login bem-sucedido",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="token", type="string")
     *         )
     *     ),
     *     @OA\Response(response=400, description="Dados inválidos"),
     *     @OA\Response(response=401, description="Credenciais inválidas"),
     *     @OA\Response(response=500, description="Erro no servidor")
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
            $stmt = $this->db->prepare("SELECT * FROM usuario WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($senha, $user['senha'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Credenciais inválidas']);
                return;
            }

            if (!isset($_ENV['JWT_SECRET'])) {
                http_response_code(500);
                echo json_encode(['error' => 'JWT_SECRET não definido']);
                return;
            }

            $payload = [
                'id'    => $user['id'],
                'nome'  => $user['nome'],
                'email' => $user['email'],
                'role'  => $user['role'],
                'exp'   => time() + 60 * 60 * 8 // 8 horas
            ];

            $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

            echo json_encode([
                'message' => 'Login realizado com sucesso',
                'token'   => 'Bearer ' . $token
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    /**
     * Envia headers padrão para JSON + CORS
     */
    private function sendJsonHeaders(): void
    {
        header("Content-Type: application/json; charset=utf-8");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }
}
