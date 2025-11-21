<?php
<?php
header('Content-Type: application/json');

// leitura de entrada JSON
$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

// carregue credenciais do environment ou config
// Defina BUSINESS_USER e BUSINESS_PASS no seu ambiente (ou edite config.sample.php e inclua)
$BUSINESS_USER = getenv('BUSINESS_USER') ?: 'business';
$BUSINESS_PASS = getenv('BUSINESS_PASS') ?: 'business123';

// validação simples (em produção use hashing e DB)
if ($username === $BUSINESS_USER && $password === $BUSINESS_PASS) {
  // token simples (substituir por JWT se desejar)
  $payload = base64_encode(json_encode(['sub' => $username, 'iat' => time()]));
  echo json_encode(['ok' => true, 'token' => $payload]);
  http_response_code(200);
  exit;
}

http_response_code(401);
echo json_encode(['ok' => false, 'message' => 'Usuário ou senha incorretos']);
exit;