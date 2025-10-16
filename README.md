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
├─ src/
│   ├─ assets/
│   │   ├─ icons/
│   │   │   └─ favicon.ico
│   │   ├─ img/
│   │   │   └─ logo.jpg
│   │   └─ styles/
│   │       ├─ global.css
│   │       └─ theme.css
│   ├─ config/
│   │   └─ zerosheets.js
│   ├─ controllers/
│   │   ├─ authController.js
│   │   └─ sheetController.js
│   ├─ routes/
│   │   ├─ authRoutes.js
│   │   └─ sheetRoutes.js
│   └─ middlewares/
│       └─ authMiddleware.js
├─ pages/
│   ├─ login/
│   │   ├─ login.html
│   │   └─ login.js
│   └─ dashboard/
│       ├─ dashboard.html
│       └─ dashboard.js
├─ scripts/
│   └─ generate-keys.js
├─ .env
├─ package.json
├─ server.js
└─ README.md
```
</details>

---

## Run WS-gestão

<details>
<summary>🚀 Script de inicialização e build do projeto WS-Gestão</summary>

```bash
# 1️⃣ Instala Node.js + dependências
npm install

# 2️⃣ Gera keys.js a partir do .env
npm run generate-keys

# 3️⃣ Desenvolvimento local
npm start

# 4️⃣ Build para deploy
npm run build

# 5️⃣ Limpar keys.js (se não for mais usar)
npm run clean-keys
```
</details>

---

<div align="center">
© JesusWellerson | Development Innovation<br>
📍 Belo Horizonte, 16 Outubro 2025<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">🔗 LinkedIn</a> | 
<a href="https://github.com/wellersonJesus" target="_blank">📌 GitHub</a>
</div>