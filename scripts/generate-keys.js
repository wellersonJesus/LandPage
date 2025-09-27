const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }); // lê .env

// Caminho de saída
const outPath = path.join(__dirname, '..', 'public', 'js', 'keys.js');

// Monta objeto com as variáveis que você quer expor ao frontend
const keys = {
  PUBLIC_API_KEY: process.env.PUBLIC_API_KEY,
  OTHER_PUBLIC_KEY: process.env.OTHER_PUBLIC_KEY
  // Não expor SECRET_TOKEN no frontend!
};

// Conteúdo final em JS
const content = `window.__KEYS__ = ${JSON.stringify(keys, null, 2)};`;

// Cria keys.js
fs.writeFileSync(outPath, content, 'utf8');
console.log('✅ keys.js gerado em public/js/keys.js');
