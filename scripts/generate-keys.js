import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const content = `
// Gerado automaticamente a partir do .env (não versionar)

// Credenciais do administrador
export const adminCredentials = {
  email: "${process.env.ADMIN_EMAIL}",
  password: "${process.env.ADMIN_PASSWORD}"
};

// Configurações do Firebase
export const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}",
  measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"
};
`;

fs.writeFileSync('./public/js/keys.js', content);
console.log("✅ keys.js gerado com sucesso!");
