# [🌏 WS Manager](https://ws-gestao-d10f13.gitlab.io/) 

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
WS-Manager/
├── 💡 backend/                        ← Node.js + SQLite
│   ├─ src/
│   │   ├─ controllers/                ← Lógica de negócio (CRUD) por tabela
│   │   │   ├─ authController.js
│   │   │   ├─ empresaController.js
│   │   │   ├─ gestaoController.js
│   │   │   ├─ contratoController.js
│   │   │   ├─ lancamentoController.js
│   │   │   ├─ manutencaoController.js
│   │   │   ├─ contaController.js
│   │   │   ├─ servidorController.js
│   │   │   ├─ dispositivoController.js
│   │   │   ├─ redeController.js
│   │   │   ├─ skillController.js
│   │   │   ├─ cursoController.js
│   │   │   ├─ plataformaController.js
│   │   │   ├─ investimentoController.js
│   │   │   ├─ calendarioController.js
│   │   │   └─ emprestimoController.js
│   │   │
│   │   ├─ routes/                     ← Rotas por tabela
│   │   │   ├─ empresaRoutes.js
│   │   │   ├─ gestaoRoutes.js
│   │   │   ├─ contratoRoutes.js
│   │   │   ├─ lancamentoRoutes.js
│   │   │   ├─ manutencaoRoutes.js
│   │   │   ├─ contaRoutes.js
│   │   │   ├─ servidorRoutes.js
│   │   │   ├─ dispositivoRoutes.js
│   │   │   ├─ redeRoutes.js
│   │   │   ├─ skillRoutes.js
│   │   │   ├─ cursoRoutes.js
│   │   │   ├─ plataformaRoutes.js
│   │   │   ├─ investimentoRoutes.js
│   │   │   ├─ calendarioRoutes.js
│   │   │   └─ emprestimoRoutes.js
│   │   │
│   │   ├─ db/
│   │   │   ├── DATABASE_SCHEMA.md       ← Documentação do schema 
│   │   │   ├── dbConnection.js          ← Banco de dados e scripts
│   │   │   ├── init-db.js               ← Criação e estrutura do DB 
│   │   │   ├── seed-db.js               ← População inicial de dados 
│   │   │   └── wsmanager_local.db       ← Banco criado 
│   │   │
│   │   └─ utils/
│   │       ├─ generate-keys.js          ← Gera keys a partir do .env
│   │       ├─ backup.js                 ← Backup incremental em JSON
│   │       └─ authMiddleware.js
│   │
│   ├─ server.js                         ← Servidor Express
│   └─ package.json
│
├── 🌍 frontend/                        ← Angular 19 (LTS)
│   ├── .angular/                 # Configurações internas do Angular
│   ├── .editorconfig             # Configuração de formatação do editor
│   ├── .gitignore                # Arquivos ignorados pelo Git
│   ├── node_modules/             # Dependências instaladas via npm
│   ├── public/                   # Arquivos públicos (ex.: favicon)
│   │   └── favicon.ico
│   ├── src/                      # Código-fonte da aplicação
│   │   ├── app/                  # Componentes, módulos e lógica do Angular
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.config.server.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.routes.server.ts
│   │   ├── assets/
│   │   │   ├── bootstrap-icons/
│   │   │   │   ├── bootstrap-icons.css
│   │   │   │   └── fonts/
│   │   │   │       ├── bootstrap-icons.woff
│   │   │   │       └── bootstrap-icons.woff2
│   │   │   ├── favicon.ico
│   │   │   ├── ws-manager.png
│   │   │   ├── logo01.png
│   │   │   ├── logo.png
│   │   │   ├── fundo01.jpg
│   │   │   ├── fundo02.jpg
│   │   │   └── brasil.jpeg
│   │   ├── environments/
│   │   │   └──environment.prod.ts
│   │   ├── index.html            # HTML principal
│   │   ├── main.ts               # Entry point do Angular
│   │   └── main.server.ts        # Entry point para server-side rendering
│   ├── angular.json              # Configuração do Angular CLI
│   ├── package.json              # Dependências e scripts npm
│   ├── package-lock.json         # Lock das versões das dependências
│   ├── README.md                 # Documentação do frontend
│   ├── tsconfig.json             # Configuração TypeScript global
│   ├── tsconfig.app.json         # Configuração TypeScript do app
│   ├── tsconfig.spec.json        # Configuração TypeScript para testes
│   └── .vscode/                  # Configurações do VSCode
├── .env
├── .gitignore
├── .gitlab-ci.yml
└── README.md
```
</details>

<details>
<summary>🎨 Paleta de cores HEX | RGB | HSL</summary>

| Cor | HEX | RGB | HSL |
|-----|-----|-----|-----|
| Vinho Claro | #9c0d2f | rgba(156,13,47,1) | hsl(345°, 86%, 33%) |
| Cinza-azulado | #93a0b7 | rgb(147,160,183) | hsl(218°, 26%, 64%) |
| Branco | #FFFFFF | rgb(255,255,255) | hsl(0°, 0%, 100%) |
| Preto | #000000 | rgb(0,0,0) | hsl(0°, 0%, 0%) |

</details>

---

## Scripts 

<details>
<summary>🛫 database dbheaver/sqlite3, run inicialização e build ...</summary>

O modelo de dados completo do WS Manager foi desenvolvido em SQLite, com foco em desempenho e simplicidade.

# 🗃️ WS Manager - Banco de Dados

**WS Manager** é uma plataforma completa para gerenciar suas finanças, contratos, investimentos, dispositivos, acessos e habilidades, unindo de forma simples e prática sua vida pessoal e profissional em um único workspace.

Tabelas **SQLite**:

```bash
ws-manager
├─ contrato
│  ├─ lancamento
│  │  └─ conta
│  │     ├─ investimento
│  │     └─ emprestimo
│  ├─ gestao
│  │  ├─ skill
│  │  ├─ curso
│  │  └─ plataforma
│  │     └─ servidor
│  └─ contrato_plataforma
│     ├─ plataforma
│     └─ servidor
├─ conta
│  ├─ lancamento
│  ├─ investimento
│  └─ emprestimo
└─ dispositivo
   ├─ manutencao
   └─ emprestimo
```

```bash
# 1️⃣ Entre na pasta backend
cd /home/wellerson/Documentos/Projetos/WS-Manager/backend

# 2️⃣ Instale as dependências principais do servidor
npm install cors morgan express dotenv sqlite3 cookie-parser dotenv

# 3️⃣ Instale as dependências de autenticação (JWT e criptografia)
npm install jsonwebtoken bcryptjs

# 4️⃣ Gere as chaves (keys.js) usadas para assinar/verificar tokens JWT
node src/utils/generate-keys.js

# 5️⃣ Crie as tabelas do banco e insira dados iniciais
node src/db/init-db.js && node src/db/seed-db.js

# 6️⃣ Inicie o servidor Node.js
npm start
```
</details>

<details>
<summary>📝 Frontend Angular CLI: 18.2.21</summary>

```bash
# 1️⃣ Acessar o diretório do projeto
cd ~/Documentos/Projetos/WS-Manager

# 2️⃣ Remover dependências antigas e cache do npm
rm -rf frontend node_modules package-lock.json
npm cache clean --force

# 3️⃣ Instalar angular
sudo npm -v install -g angular/cli

# 4️⃣  Criar aplicacao
npx @angular/cli@19 new frontend --routing --style=scss

# 5️⃣ acesse a pasta do backend e exibe versao instalado
cd frontend
ng version

# 6️⃣ Rodar o servidor local e abrir no navegador
npx ng serve --open

# Criar novos módulos, organiza e agrupa componentes, serviços e rotas. 
npx ng generate module nome-modulo --routing 

# onstrói a interface visual do app.
npx ng generate component nome-componente
```
</details>

<details>
<summary>🖌️ Bootstrap 4.1.3, jQuery e Popper</summary>

```bash
# 1️⃣ Entre na pasta do frontend:
cd ~/Documentos/Projetos/WS-Manager/frontend

# 2️⃣ Instale a versão correta do zone.js:
npm install zone.js@~0.15.0 --save

# 3️⃣ Instale o Bootstrap 4.1.3, .js 1.14.3 usando --legacy-peer-deps 
npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --legacy-peer-deps
npm audit fix --force

# 4️⃣ Instale os icones
npm install bootstrap-icons

# Agora no arquivo angular.json você adiciona os arquivos 
# do Bootstrap nos nós styles e scripts que ficam no caminho 
# architect.build.options conforme abaixo. 
# Você precisa colocar os arquivos na mesma ordem abaixo.

angular.json
   |
   └─ "styles": [
                  "node_modules/bootstrap/dist/css/bootstrap.css",
                  "src/styles.scss"
                ],
                  "scripts": [
                    "node_modules/jquery/dist/jquery.js",
                    "node_modules/popper.js/dist/umd/popper.js",
                    "node_modules/bootstrap/dist/js/bootstrap.js"
                ],

# Ajuste o trecho logo abaixo 
# para instalar icones do bootstrap

angular.json
   |
   └─ "test": 
            "styles": [
              "src/styles.scss",
              "node_modules/bootstrap-icons/font/bootstrap-icons.css"
            ],

# Ajuste também o trecho logo abaixo para que as imagens 
# sejam devidamente exibidas no projeto com Angular

angular.json
   |
   └─ "assets": [
                  {
                    "glob": "**/*",
                    "input": "src/assets",
                    "output": "assets"
                  },
                  {
                    "glob": "**/*",
                    "input": "public",
                    "output": "public"
                  },
                  "src/favicon.ico"
                ],
```
</details>

<details>

# 🛫 Servidor - Render 

Conferir url **API_BASE_URL_PROD=?**, para usar o ambiente de produção.

<summary>🌍 Servidor Render ...</summary>

```bash
# 1️⃣ Root Directory
backend

# 2️⃣ Start Command
npm start

# 3️⃣ Environment Variables
JWT_COOKIE_NAME • • • • • • • • • • • •
JWT_EXPIRES_IN  • • • • • • • • • • • •
JWT_SECRET      • • • • • • • • • • • •
```
</details>

<div align="center">
© JesusWellerson |Development Innovation<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">LinkedIn</a> - 
<a href="https://github.com/wellersonJesus" target="_blank">GitHub</a>
</div>


```bash
# 🧠 Como usar na prática
# Ambiente	Comando	URL Final	Observação
# 💻 Local (dev)	
npm run start	http://localhost:4200/

# Serve com baseHref /
# 🧱 Build local	
npm run build:dev	dist/ws-manager-frontend	

#Para testar com npx http-server
# 🌍 Produção (servidor próprio)	
npm run build:prod	dist/ws-manager-frontend	

# Usa /
# 📄 GitLab Pages	
npm run build:pages	dist/ws-manager-frontend	
Usa /ws-manager-309387/
```