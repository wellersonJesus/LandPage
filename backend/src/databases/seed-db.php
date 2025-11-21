<?php
/**
 * seed-db.php
 * Insere dados iniciais no banco
 */

require_once __DIR__ . '/dbConnection.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();

$db = getDB();

// Função de hash de senha
function hashSenha($senha) {
    return password_hash($senha, PASSWORD_DEFAULT);
}

try {
    // --- Usuários ---
    $usuarios = [
        ['Administrador', $_ENV['ADMIN_EMAIL'] ?? 'admin@example.com', hashSenha($_ENV['ADMIN_PASSWORD'] ?? 'admin123'), 'admin'],
        ['Usuário Comum', $_ENV['USER_EMAIL'] ?? 'user@example.com', hashSenha($_ENV['USER_PASSWORD'] ?? 'user123'), 'user']
    ];

    foreach ($usuarios as $u) {
        $stmt = $db->prepare("INSERT OR IGNORE INTO usuario (nome, email, senha, role) VALUES (?, ?, ?, ?)");
        $stmt->execute($u);
    }

    echo "✅ Seeds de usuário inseridos com sucesso.\n";

} catch (PDOException $e) {
    echo "❌ Erro ao inserir seeds: " . $e->getMessage() . "\n";
}
