// scripts/generate-case.js
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configurações Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.FIREBASE_APP_ID || "",
};

// Credenciais admin/local
const adminCredentials = {
  email: process.env.ADMIN_EMAIL || "admin@ws-gestao.com",
  password: process.env.ADMIN_PASSWORD || "123456",
};

// Conteúdo do arquivo keys.js
const content = `// 🔑 Arquivo gerado automaticamente por generate-case.js
// ⚠️ Não versionar este arquivo!
export const firebaseConfig = ${JSON.stringify(firebaseConfig, null, 2)};
export const adminCredentials = ${JSON.stringify(adminCredentials, null, 2)};
`;

// Cria a pasta src/app se não existir
if (!fs.existsSync("src/app")) {
  fs.mkdirSync("src/app", { recursive: true });
}

// Remove arquivos antigos
const oldFiles = ["src/app/keys-local.js", "src/app/keys-reco.js", "src/app/keys.js"];
oldFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`🗑️ Arquivo removido: ${file}`);
  }
});

// Cria o novo keys.js
fs.writeFileSync("src/app/keys.js", content);
console.log("✅ src/app/keys.js gerado com sucesso!");
