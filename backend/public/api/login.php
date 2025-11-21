<?php
header('Content-Type: application/json; charset=utf-8');

/**
 * Carrega e faz parse simples de um arquivo .env
 * Retorna array chave => valor
 */
function loadDotEnv(string $path): array {
  if (!file_exists($path)) return [];
  $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  $data = [];
  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '' || $line[0] === '#' || strpos($line, '//') === 0) continue;
    // suporta KEY=VALUE e export KEY=VALUE
    if (strpos($line, 'export ') === 0) $line = trim(substr($line, 7));
    $parts = explode('=', $line, 2);
    if (count($parts) !== 2) continue;
    $key = trim($parts[0]);
    $val = trim($parts[1]);
    // remove aspas se existirem
    if ((strlen($val) >= 2) && (($val[0] === '"' && $val[strlen($val)-1] === '"') || ($val[0] === "'" && $val[strlen($val)-1] === "'"))) {
      $val = substr($val, 1, -1);
    }
    $data[$key] = $val;
  }
  return $data;
}

// local do .env (a partir deste arquivo: backend/public/api -> ../../.. -> projeto root)
$envPath = __DIR__ . '/../../../.env';
$env = loadDotEnv($envPath);

// env-based fallbacks
$ENV_BUSINESS_USER = $env['BUSINESS_USER'] ?? getenv('BUSINESS_USER') ?: null;
$ENV_BUSINESS_PASS = $env['BUSINESS_PASS'] ?? getenv('BUSINESS_PASS') ?: null;
$ENV_SQLITE_PATH = $env['SQLITE_PATH_LOCAL'] ?? $env['SQLITE_PATH'] ?? getenv('SQLITE_PATH_LOCAL') ?: null;

// read request
$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// try DB auth (SQLite) if path provided and file exists
if ($ENV_SQLITE_PATH) {
  // normalize relative paths from project root
  $candidate = $ENV_SQLITE_PATH;
  if ($candidate[0] !== '/') {
    $projectRoot = realpath(__DIR__ . '/../../../') ?: (__DIR__ . '/../../../');
    $candidate = rtrim($projectRoot, '/') . '/' . ltrim($candidate, '/');
  }
  if (file_exists($candidate)) {
    try {
      $pdo = new PDO('sqlite:' . $candidate);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      // try to find user (common columns: username, password_hash or password)
      $stmt = $pdo->prepare('SELECT * FROM users WHERE username = :u LIMIT 1');
      $stmt->execute([':u' => $username]);
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row) {
        // prefer password_hash column
        if (!empty($row['password_hash']) && password_verify($password, $row['password_hash'])) {
          $token = base64_encode(json_encode(['sub' => $username, 'iat' => time()]));
          http_response_code(200);
          echo json_encode(['ok' => true, 'token' => $token]);
          exit;
        }
        // fallback to plaintext password column (dev only)
        if (isset($row['password']) && $row['password'] === $password) {
          $token = base64_encode(json_encode(['sub' => $username, 'iat' => time()]));
          http_response_code(200);
          echo json_encode(['ok' => true, 'token' => $token]);
          exit;
        }
      }
    } catch (Exception $e) {
      // ignore DB errors and fallback to env auth
    }
  }
}

// fallback to .env credentials (development)
if ($ENV_BUSINESS_USER !== null && $ENV_BUSINESS_PASS !== null) {
  if ($username === $ENV_BUSINESS_USER && $password === $ENV_BUSINESS_PASS) {
    $token = base64_encode(json_encode(['sub' => $username, 'iat' => time()]));
    http_response_code(200);
    echo json_encode(['ok' => true, 'token' => $token]);
    exit;
  }
}

// default unauthorized
http_response_code(401);
echo json_encode(['ok' => false, 'message' => 'Usuário ou senha incorretos']);
exit;