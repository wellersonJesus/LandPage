// backend/src/utils/generate-keys.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Carrega variáveis do .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keysPath = path.resolve(__dirname, 'keys.js');
const sqlitePath = path.resolve(__dirname, '../db/wsmanager_local.db');
const getEnv = (key, defaultValue = '') => process.env[key] || defaultValue;

// Conteúdo a ser gravado em keys.js
const keysContent = `
// ESTE ARQUIVO É GERADO AUTOMATICAMENTE PELO generate-keys.js
// NÃO EDITAR MANUALMENTE

export const KEYS = {
  PORT: ${getEnv('PORT', 3000)},
  API_KEY: '${getEnv('API_KEY')}',
  SQLITE_PATH: '${sqlitePath.replace(/\\/g, '/')}',
  BACKUP_JSON_PATH: '${getEnv('BACKUP_JSON_PATH', 'backup/data.json')}',
  ADMIN_EMAIL: '${getEnv('ADMIN_EMAIL')}',
  ADMIN_PASSWORD: '${getEnv('ADMIN_PASSWORD')}',
  USER_EMAIL: '${getEnv('USER_EMAIL')}',
  USER_PASSWORD: '${getEnv('USER_PASSWORD')}',
  API_BASE_URL: '${process.env.NODE_ENV === 'production' ? getEnv('API_BASE_URL_PROD') : getEnv('API_BASE_URL_LOCAL')}',
  FIREBASE_API_KEY: '${getEnv('FIREBASE_API_KEY')}',
  FIREBASE_AUTH_DOMAIN: '${getEnv('FIREBASE_AUTH_DOMAIN')}',
  FIREBASE_PROJECT_ID: '${getEnv('FIREBASE_PROJECT_ID')}',
  FIREBASE_STORAGE_BUCKET: '${getEnv('FIREBASE_STORAGE_BUCKET')}',
  FIREBASE_MESSAGING_SENDER_ID: '${getEnv('FIREBASE_MESSAGING_SENDER_ID')}',
  FIREBASE_APP_ID: '${getEnv('FIREBASE_APP_ID')}',
  FIREBASE_MEASUREMENT_ID: '${getEnv('FIREBASE_MEASUREMENT_ID')}',
};
`;

// Cria ou sobrescreve o arquivo keys.js
fs.writeFileSync(keysPath, keysContent, { encoding: 'utf8' });

console.log(`✅ Arquivo keys.js criado em: ${keysPath}`);
console.log(`📁 Caminho do banco configurado: ${sqlitePath}`);
