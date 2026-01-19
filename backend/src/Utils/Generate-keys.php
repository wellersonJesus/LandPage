<?php

require_once __DIR__ . '/../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();

// Caminhos
$keysPath = __DIR__ . '/keys.php';
$sqlitePath = realpath(__DIR__ . '/../db/landpage_local.db');

// Função para pegar variável de ambiente com fallback
function getEnvVar(string $key, $default = '') {
    return $_ENV[$key] ?? $default;
}

// Conteúdo a ser gravado em keys.php
$keysContent = "<?php\n\n";
$keysContent .= "// ESTE ARQUIVO É GERADO AUTOMATICAMENTE PELO GenerateKeys.php\n";
$keysContent .= "// NÃO EDITAR MANUALMENTE\n\n";
$keysContent .= "return [\n";
$keysContent .= "    'PORT' => " . (int)getEnvVar('PORT', 3000) . ",\n";
$keysContent .= "    'API_KEY' => '" . getEnvVar('API_KEY') . "',\n";
$keysContent .= "    'SQLITE_PATH' => '" . str_replace('\\', '/', $sqlitePath) . "',\n";
$keysContent .= "    'BACKUP_JSON_PATH' => '" . getEnvVar('BACKUP_JSON_PATH', 'backup/data.json') . "',\n";
$keysContent .= "    'ADMIN_EMAIL' => '" . getEnvVar('ADMIN_EMAIL') . "',\n";
$keysContent .= "    'ADMIN_PASSWORD' => '" . getEnvVar('ADMIN_PASSWORD') . "',\n";
$keysContent .= "    'USER_EMAIL' => '" . getEnvVar('USER_EMAIL') . "',\n";
$keysContent .= "    'USER_PASSWORD' => '" . getEnvVar('USER_PASSWORD') . "',\n";
$keysContent .= "    'API_BASE_URL' => '" . (getEnvVar('NODE_ENV') === 'production' ? getEnvVar('API_BASE_URL_PROD') : getEnvVar('API_BASE_URL_LOCAL')) . "',\n";
$keysContent .= "    'FIREBASE_API_KEY' => '" . getEnvVar('FIREBASE_API_KEY') . "',\n";
$keysContent .= "    'FIREBASE_AUTH_DOMAIN' => '" . getEnvVar('FIREBASE_AUTH_DOMAIN') . "',\n";
$keysContent .= "    'FIREBASE_PROJECT_ID' => '" . getEnvVar('FIREBASE_PROJECT_ID') . "',\n";
$keysContent .= "    'FIREBASE_STORAGE_BUCKET' => '" . getEnvVar('FIREBASE_STORAGE_BUCKET') . "',\n";
$keysContent .= "    'FIREBASE_MESSAGING_SENDER_ID' => '" . getEnvVar('FIREBASE_MESSAGING_SENDER_ID') . "',\n";
$keysContent .= "    'FIREBASE_APP_ID' => '" . getEnvVar('FIREBASE_APP_ID') . "',\n";
$keysContent .= "    'FIREBASE_MEASUREMENT_ID' => '" . getEnvVar('FIREBASE_MEASUREMENT_ID') . "',\n";
$keysContent .= "];\n";

// Cria ou sobrescreve o arquivo keys.php
file_put_contents($keysPath, $keysContent);

echo "✅ Arquivo keys.php criado em: {$keysPath}\n";
echo "📁 Caminho do banco configurado: {$sqlitePath}\n";
