<?php

namespace App\Controllers;

// Inclui a conexão com o banco SQLite
require_once __DIR__ . '/../databases/dbConnection.php';

use PDO;
use PDOException;
use Firebase\JWT\JWT;

class AuthController
{
    private PDO $db;

    public function __construct()
    {
        // Inicializa conexão com o banco SQLite
        $this->db = getDB();

        // Carrega variáveis de ambiente se ainda não carregadas
        if (!isset($_ENV['JWT_SECRET'])) {
            $dotenv = \Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
            $dotenv->load();
        }

        // Garante que exista usuário admin inicial
        $this->createAdminIfNotExists();
    }

    // =========================================================
    // Cria usuário admin se não existir
    // =========================================================
    private function createAdminIfNotExists(): void
    {
        $email = $_ENV['ADMIN_EMAIL'] ?? null;
        $senha = $_ENV['ADMIN_PASSWORD'] ?? null;
        if (!$email || !$senha) return;

        try {
            $stmt = $this->db->prepare("SELECT id FROM usuario WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
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

    // =========================================================
    // Criar usuário manualmente
    // =========================================================
    public function createUsuario(): void
    {
        $this->sendJsonHeaders();

        $body = json_decode(file_get_contents('php://input'), true);
        $nome  = $body['nome']  ?? null;
        $email = $body['email'] ?? null;
        $senha = $body['senha'] ?? null;
        $role  = $body['role']  ?? null;

        // Senha padrão se não enviada
        $finalSenha = $senha ?: ($role === 'admin'
            ? ($_ENV['ADMIN_PASSWORD'] ?? null)
            : ($_ENV['USER_PASSWORD'] ?? 'user123')
        );

        if (!$nome || !$email || !$finalSenha || !$role) {
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
                'id' => $this->db->lastInsertId(),
                'nome' => $nome,
                'email' => $email,
                'role' => $role
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // =========================================================
    // Listar usuários
    // =========================================================
    public function listUsuarios(): void
    {
        $this->sendJsonHeaders();

        try {
            $stmt = $this->db->query("SELECT id, nome, email, role FROM usuario");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($rows);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // =========================================================
    // Login
    // =========================================================
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

            // Cria token JWT
            $payload = [
                'id' => $user['id'],
                'nome' => $user['nome'],
                'email' => $user['email'],
                'role' => $user['role'],
                'exp' => time() + 60*60*8 // 8 horas
            ];

            $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

            echo json_encode([
                'message' => 'Login realizado com sucesso',
                'token' => 'Bearer ' . $token
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // =========================================================
    // Função auxiliar para garantir JSON
    // =========================================================
    private function sendJsonHeaders(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *'); // ajuste se for usar front-end específico
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
