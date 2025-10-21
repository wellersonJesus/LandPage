# [🌏 WS-gestão](https://ws-gestao-d10f13.gitlab.io/) 

## 💡 Observações Importantes

Aplicação web **full-stack** responsiva, com front-end no **GitLab Pages** e back-end em **Node.js + SQLite** no **Render**. Permite **CRUD completo**, histórico incremental em JSON e fácil manutenção.

- **Front-end:** Angular + Bootstrap, consumindo dados via API.  
- **Back-end:** Node.js + SQLite, gerenciando CRUD e fornecendo endpoints REST.  
- **Backup:** `data.json` atualizado incrementalmente, acessível via `/api/historico`.  
- **Segurança:** API protegida por **API_KEY** e credenciais configuráveis via `.env`.  

---

## **Tecnologias e Ferramentas Utilizadas**

- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) — Hospedagem do front-end estático  
- [Render](https://render.com/) — Hospedagem do back-end Node.js + SQLite (API RESTful)  
- [SQLite](https://www.sqlite.org/) — Banco de dados leve e persistente  
- [Angular](https://angular.io/) — Framework front-end  
- [Bootstrap](https://getbootstrap.com/) — Layout responsivo e estilização  
- [HTML](https://www.w3schools.com/html/) — Estrutura da aplicação  
- [CSS](https://www.w3schools.com/css/) — Estilização do front-end  
- [JavaScript / TypeScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Lógica do front-end e back-end  

---

## Estrutura 

<details>
<summary>📂 Clique aqui para expandir a Estrutura Completa do Projeto</summary>

```bash
ws-gestao/
├─ frontend/                   ← Angular + Bootstrap (Hospedagem: GitLab Pages)
│   ├─ src/
│   │   ├─ app/
│   │   │   ├─ components/
│   │   │   │    └─ login/
│   │   │   │        ├─ login.component.html
│   │   │   │        └─ login.component.ts
│   │   │   ├─ services/
│   │   │   │    └─ auth.service.ts      ← Consome API para login
│   │   │   ├─ app.component.html
│   │   │   ├─ app.component.css
│   │   │   └─ app.module.ts
│   │   ├─ assets/
│   │   │   ├─ img/
│   │   │   └─ styles/
│   │   │       └─ main.css
│   │   ├─ environments/
│   │   │   ├─ environment.ts
│   │   │   └─ environment.prod.ts
│   │   ├─ index.html
│   │   ├─ main.ts
│   │   ├─ polyfills.ts
│   │   └─ tsconfig.app.json
│   ├─ angular.json
│   └─ package.json
│
├─ backend/                    ← Node.js + SQLite (Render)
│   ├─ src/
│   │   ├─ controllers/
│   │   │   ├─ sheetController.js        ← Funções CRUD para SQLite
│   │   │   └─ authController.js         ← Login e autenticação
│   │   ├─ routes/
│   │   │   ├─ authRoutes.js
│   │   │   └─ sheetRoutes.js
│   │   ├─ db/
│   │   │   ├── database.sqlite          ← Banco de dados SQLite
│   │   │   ├── init-db.js               ← Script para criar/ popular db
│   │   │   └── wsgestao_local.db       ← Criado automaticamente
│   │   └─ utils/
│   │       ├─ generate-keys.js         ← Gera keys.js a partir do .env
│   │       └─ backup.js                ← Função backup incremental para data.json
│   ├─ server.js                         ← Servidor Express
│   └─ package.json
│
├─ .env                                  ← Configurações, credenciais e paths
├─ .gitignore
└─ README.md
```
</details>

---

## Scripts 

<details>
<summary>🛢️ database dbheaver/sqlite3</summary>

```bash
# 1️⃣ Vá para a pasta do banco de dados
cd /home/well/Documentos/projetos/ws-gestao/backend/src/db

# 2️⃣ Instale dependências (sqlite3 e sqlite)
npm install sqlite3 sqlite

# 3️⃣ Inicialize o banco de dados
node init-db.js
```
</details>

<details>
<summary>🛫 inicialização e build ...</summary>

```bash
# 1️⃣ Entre na pasta do backend e instale dependências
cd backend
npm install

# 2️⃣ Gere keys.js a partir do .env (se necessário)
npm run generate-keys

# 3️⃣ Rode o servidor
node ./server.js

# 4️⃣ Ou, se estiver configurado no package.json:
npm start
```
</details>

<details>
<summary>🌍 inicialização frontend ...</summary>

```bash
# 1️⃣ Entre na pasta do frontend e instale dependências
cd ../frontend
npm install

# 2️⃣ Rode a aplicação Angular na porta padrão (4200)
npm start
```
</details>

---

<div align="center">
© JesusWellerson |Development Innovation<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">LinkedIn</a> - 
<a href="https://github.com/wellersonJesus" target="_blank">GitHub</a>
</div>
