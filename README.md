# [🌏 WS-gestão](https://ws-gestao-d10f13.gitlab.io/) 

Aplicação web totalmente responsiva. Serviço full-stack com front-end hospedado no **GitLab Pages** e back-end em **Node.js + SQLite** hospedado no **Render**. Permite CRUD completo de dados, histórico incremental em JSON e fácil manutenção.  

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

## Estrutura do Projeto

<details>
<summary>📂 Clique aqui para expandir a Estrutura Completa do Projeto</summary>

```bash
ws-gestao/
├─ frontend/                   ← Angular + Bootstrap (Hospedagem: GitLab Pages)
│   ├─ src/
│   │   ├─ app/
│   │   │   ├─ components/     ← Componentes da interface
│   │   │   ├─ services/       ← Serviços Angular para consumir API
│   │   │   └─ app.module.ts
│   │   ├─ assets/
│   │   │   ├─ img/
│   │   │   └─ styles/
│   │   ├─ index.html
│   │   └─ main.ts
│   ├─ angular.json
│   └─ package.json
│
├─ backend/                    ← Node.js + SQLite (Hospedagem: Render)
│   ├─ src/
│   │   ├─ controllers/
│   │   │   └─ sheetController.js  ← Funções CRUD para SQLite
│   │   ├─ routes/
│   │   │   └─ sheetRoutes.js      ← Rotas da API
│   │   ├─ db/
│   │   │   └─ database.sqlite     ← Banco de dados SQLite
│   │   └─ utils/
│   │       └─ backup.js           ← Função backup incremental para data.json
│   ├─ server.js                   ← Servidor Express
│   └─ package.json
│
├─ .env                        ← Configurações, credenciais e paths
│
└─ README.md
```
</details>

---

## Run WS-gestão

<details>
<summary>🚀 Script de inicialização e build do projeto WS-Gestão</summary>

```bash
# 1️⃣ Instala Node.js + dependências (back-end)
cd backend
npm install

# 2️⃣ Instala dependências do Angular (front-end)
cd ../frontend
npm install

# 3️⃣ Gera keys.js a partir do .env (se necessário)
npm run generate-keys

# 4️⃣ Desenvolvimento local (back-end + front-end)
# Back-end
cd ../backend
npm start

# Front-end
cd ../frontend
ng serve

# 5️⃣ Build front-end para deploy no GitLab Pages
ng build --prod

# 6️⃣ Limpar keys.js (se não for mais usar)
npm run clean-keys
```
</details>

---

💡 Observações Importantes

Front-end: Angular + Bootstrap hospedado no GitLab Pages, acessa dados via API.
Back-end: Node.js + SQLite hospedado no Render, realiza CRUD completo.
Backup: data.json atualizado incrementalmente, histórico acessível via endpoint /api/historico.
Segurança: API protegida por API_KEY interna, credenciais de admin e usuário configuráveis via .env.

---

<div align="center">
© JesusWellerson | Development Innovation<br>
📍 Belo Horizonte, 17 Outubro 2025<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">🔗 LinkedIn</a> | 
<a href="https://github.com/wellersonJesus" target="_blank">📌 GitHub</a>
</div>
