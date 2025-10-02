import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const isCI = process.env.CI === 'true'; // Detecta se está rodando no GitLab CI
const outputFile = isCI ? './public/js/keys.reco.js' : './public/js/keys.local.js';

const content = `/* 🔑 Gerado automaticamente ${isCI ? 'no CI/CD' : 'localmente'} */

export const adminCredentials = {
  email: "${process.env.ADMIN_EMAIL || 'admin@teste.com'}",
  password: "${process.env.ADMIN_PASSWORD || '1234'}"
};

export const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY || 'api-key'}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'project.firebaseapp.com'}",
  projectId: "${process.env.FIREBASE_PROJECT_ID || 'project-id'}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'project.appspot.com'}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || 'sender-id'}",
  appId: "${process.env.FIREBASE_APP_ID || 'app-id'}",
  measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || 'G-XXXXXXX'}"
};
`;

fs.writeFileSync(outputFile, content, 'utf-8');
console.log(`✅ ${outputFile.replace('./public/js/', '')} gerado com sucesso!`);
