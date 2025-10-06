# [🌏 WS-gestão](https://ws-gestao-d10f13.gitlab.io/) 

Aplicação web totalmente responsiva. Serviço serverless com armazenamento e processamento de dados. Garante fácil acesso, escalabilidade e manutenção simplificada.

---

## **Tecnologias e Ferramentas Utilizadas**

- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) — Hospedagem sites estáticos  
- [ZeroSheets](https://www.zerosheets.com/) — Backend serverless   
- [HTML](https://www.w3schools.com/html/) — Estruturação da aplicação  
- [CSS](https://www.w3schools.com/css/) — Estilização e layout   
- [Bootstrap](https://getbootstrap.com/) — Framework CSS design responsivo  
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Lógica interatividade frontend  

---

## GitLab CI & Estrutura

Este projeto utiliza **GitLab CI/CD** para build e deploy automático no **GitLab Pages**, seguindo as instruções do arquivo [`.gitlab-ci.yml`](.gitlab-ci.yml).  

<details>
<summary>📂 Clique aqui para expandir a Estrutura do Projeto</summary>

```bash
ws-gestao/
│
├─ src/                         
│  ├─ app/                      # núcleo da aplicação
│  │   ├─ app.js                # inicialização global
│  │   ├─ router.js             # controle de rotas (simples em JS)
│  │   ├─ config.js             # configs globais (ex: baseURL, versão, etc.)
│  │   └─ keys.js               # 🔑 gerado a partir do .env (NÃO versionado)
│  │
│  ├─ pages/                    # cada tela (modularizado)
│  │   ├─ login/
│  │   │   ├─ login.html
│  │   │   ├─ login.js
│  │   │   └─ login.css
│  │   ├─ dashboard/
│  │   │   ├─ dashboard.html
│  │   │   ├─ dashboard.js
│  │   │   └─ dashboard.css
│  │   └─ ...
│  │
│  ├─ services/                 # integração e lógica de negócio
│  │   ├─ firebase.service.js   # login social (Google, etc.)
│  │   ├─ auth.service.js       # autenticação admin/local
│  │   ├─ storage.service.js    # manipulação de session/localStorage
│  │   └─ zerosheets.service.js # integração com Google Sheets (simulando DB)
│  │
│  ├─ assets/                   # estáticos (imagens, ícones, CSS global)
│  │   ├─ img/
│  │   ├─ icons/
│  │   └─ styles/
│  │        ├─ global.css
│  │        └─ theme.css
│  │
│  ├─ index.html                # SPA bootstrap (carrega main.js)
│  └─ main.js                   # entrypoint → inicializa app.js e router
│
├─ public/                      # build final para deploy (output do CI/CD)
│   └─ ...
│
├─ scripts/                     # scripts auxiliares (CI/CD)
│  ├─ generate-case.js          # gera src/app/keys.js a partir do .env
│  └─ zerosheets.js             # utilitário p/ conexão com Google Sheets
│
├─ package.json
├─ .env                         # credenciais (Firebase + Sheets API)
├─ .gitignore
└─ README.md
```
</details>

---

## Run WS-gestão

<details>
<summary>🚀 Script de inicialização e build do projeto WS-Gestão</summary>

```bash
# 1️⃣ Atualiza o sistema e instala Node.js + npm (Ubuntu/Debian)
sudo apt update && sudo apt install -y nodejs npm

# 2️⃣ Instala as dependências do projeto (baseadas no package.json)
npm install

# 3️⃣ Gera automaticamente o arquivo src/app/keys.js a partir do .env
# (Essencial antes de rodar ou compilar o projeto)
npm run generate-keys

# 4️⃣ Executa o servidor local para desenvolvimento (abre src/pages/login/login.html)
# Use este comando enquanto estiver desenvolvendo o projeto.
npm start

# ⚙️ 5️⃣ (Opcional) Gera o build final na pasta public/
# Use este comando apenas quando quiser preparar os arquivos para deploy (ex: GitLab Pages, Vercel etc.)
npm run build
```
</details>

---

<div align="center">
© JesusWellerson | Development Innovation<br>
📍 Belo Horizonte, 03 Outubro 2025<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">🔗 LinkedIn</a> | 
<a href="https://github.com/wellersonJesus" target="_blank">📌 GitHub</a>
</div>
