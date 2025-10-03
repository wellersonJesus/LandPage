// scripts/generate-case.js
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const adminCredentials = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const content = `// 🔑 Arquivo gerado automaticamente por generate-case.js
export const firebaseConfig = ${JSON.stringify(firebaseConfig, null, 2)};
export const adminCredentials = ${JSON.stringify(adminCredentials, null, 2)};
`;

fs.writeFileSync("src/app/keys.js", content);
console.log("✅ src/app/keys.js gerado com sucesso!");
