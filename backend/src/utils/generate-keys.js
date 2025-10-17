// backend/src/utils/generate-keys.js

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Carrega variáveis do .env
dotenv.config();

// Define caminho do arquivo keys.js
const keysPath = path.resolve(__dirname, 'keys.js');

// Escolhe o caminho do banco de dados conforme o ambiente
const sqlitePath = process.env.NODE_ENV === 'production' 
  ? process.env.SQLITE_PATH_PROD 
  : process.env.SQLITE_PATH_LOCAL;

// Conteúdo a ser escrito em keys.js
const keysContent = `
// ESTE ARQUIVO É GERADO AUTOMATICAMENTE PELO generate-keys.js
// NÃO EDITAR MANUALMENTE

module.exports = {
  // Configurações gerais
  PORT: ${process.env.PORT || 3000},
  API_KEY: '${process.env.API_KEY}',

  // Paths dos bancos e backup
  SQLITE_PATH: '${sqlitePath}',
  BACKUP_JSON_PATH: '${process.env.BACKUP_JSON_PATH}',

  // Credenciais de usuários
  ADMIN_EMAIL: '${process.env.ADMIN_EMAIL}',
  ADMIN_PASSWORD: '${process.env.ADMIN_PASSWORD}',
  USER_EMAIL: '${process.env.USER_EMAIL}',
  USER_PASSWORD: '${process.env.USER_PASSWORD}',

  // URLs do Front-end
  API_BASE_URL: '${process.env.NODE_ENV === 'production' ? process.env.API_BASE_URL_PROD : process.env.API_BASE_URL_LOCAL}',

  // Firebase (opcional)
  FIREBASE_API_KEY: '${process.env.FIREBASE_API_KEY}',
  FIREBASE_AUTH_DOMAIN: '${process.env.FIREBASE_AUTH_DOMAIN}',
  FIREBASE_PROJECT_ID: '${process.env.FIREBASE_PROJECT_ID}',
  FIREBASE_STORAGE_BUCKET: '${process.env.FIREBASE_STORAGE_BUCKET}',
  FIREBASE_MESSAGING_SENDER_ID: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
  FIREBASE_APP_ID: '${process.env.FIREBASE_APP_ID}',
  FIREBASE_MEASUREMENT_ID: '${process.env.FIREBASE_MEASUREMENT_ID}',
};
`;

// Cria ou sobrescreve o arquivo keys.js
fs.writeFileSync(keysPath, keysContent, { encoding: 'utf8' });

console.log(`✅ Arquivo keys.js criado em: ${keysPath}`);
