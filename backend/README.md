_Para visualizar README em desenvolvimento: **Ctrl + Shift + V**_

---
# 💡 Visão Geral

_[🌏 Backend - WS Manager ](https://ws-gestao-d10f13.gitlab.io/)_ 

_Aplicação full-stack com back-end em Node.js + SQLite e front-end em Angular. Este backend fornece API RESTful, gerencia o banco de dados e seeds iniciais, além de oferecer suporte para autenticação, histórico e segurança via JWT._

#### 📂 Organização do projeto

- Back-end: _Node.js + Express + SQLite_
- Front-end: _Angular + Bootstrap (separado)_
- Banco de dados: _SQLite (local ou produção)_
- Autenticação: _JWT (cookies ou headers)_
- Configuração: _via .env para portas, credenciais, chaves e URLs de API_

#### .Env

<details>
<summary>💾 Variáveis de Ambiente (.env)</summary>

```bash
.env/

# Backend
PORT=3000

# Banco de dados
SQLITE_PATH_LOCAL=./src/databases/wsmanager_local.db
SQLITE_PATH_PROD=./src/databases/wsmanager_producao.db

# Usuários iniciais
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
USER_PASSWORD=...

# JWT
JWT_SECRET=chave-secreta
JWT_EXPIRES_IN=8h
JWT_COOKIE_NAME=ws_token

# API URLs
API_BASE_URL_LOCAL=http://localhost:3000
API_BASE_URL_PROD=https://...
```
</details>

#### Estrutura 

<details>
<summary>📂 Pastas do projeto backEnd</summary>

```bash
backend/
├── src/
│   ├── controllers/          ← Lógica de negócio (CRUD por tabela)
│   │   ├─ authController.js
│   │   ├─ empresaController.js
│   │   └─ ...
│   ├── routes/               ← Rotas de API por tabela
│   │   ├─ authRoutes.js
│   │   ├─ empresaRoutes.js
│   │   └─ ...
│   ├── db/                   ← Banco de dados e scripts
│   │   ├─ dbConnection.js    ← Conexão PDO/SQLite
│   │   ├─ init-db.js         ← Criação do esquema inicial
│   │   ├─ seed-db.js         ← Inserção de seeds iniciais
│   │   ├─ migrations/        ← Migrations (001_create_usuario.php, etc.)
│   │   └─ wsmanager_local.db ← Banco local
│   ├── utils/                ← Helpers e middlewares
│   │   ├─ authMiddleware.js
│   │   ├─ backup.js
│   │   └─ generate-keys.js
│   └── server.js             ← Servidor Express
├── package.json              ← Dependências e scripts npm
├── .env                      ← Variáveis de ambiente
└── README.md                 ← Documentação do backend
```
</details>

#### Databases

<details>
<summary>🛠️ Migrations e Seeds</summary>

- **Migrations**: cada tabela tem um arquivo.
```bash
#Como rodar as migrations
cd backend/src/databases
  -> php run-migrations.php

#Na pasta src/db/migrations/ 
001_create_<tabela>.php 
```
---
- **Seeds**: seed-db.php insere dados iniciais (usuários, empresas, contas etc.)
---
- **Execução automática**: script dev-setup.php roda todas migrations + seeds de uma vez.

#### 📚 Estrutura do Banco (SQLite)

```bash
#Tabelas principais:
usuario, empresa, gestao, contrato, lancamento, manutencao,
conta, servidor, dispositivo, rede, skill, curso, plataforma,
investimento, calendario, emprestimo

#Importante
Cada tabela possui ID auto-incremental, campos obrigatórios e relacionamentos.

#Relacionamentos principais:
contrato → conta, investimento
gestao → lancamento
servidor → plataforma
```
</details>

#### Scripts

<details>
<summary>🔧 Scripts Úteis</summary>

```bash
# Rodar migrations
php src/db/migrations/001_create_usuario.php
php src/db/migrations/002_create_empresa.php

# Rodar seeds
php src/db/seed-db.php

# Rodar servidor Node.js
npm start

# Limpar banco local (apenas para dev)
rm src/db/wsmanager_local.db
node src/db/init-db.js
node src/db/seed-db.js
```
</details>

#### Run 

<details>
<summary>⚙️ Instalação e Inicialização</summary>


```bash
1. Instalar dependências:
    cd backend
    npm install
    npm install cors morgan express dotenv sqlite3 cookie-parser jsonwebtoken bcryptjs

2. Gerar chaves JWT (opcional):
    node src/utils/generate-keys.js

3. Criar banco de dados e rodar migrations:
    node src/db/init-db.js       # Cria o esquema inicial

4. Popular dados iniciais (seeds):
    node src/db/seed-db.js

5. Rodar servidor local:
    npm start
    URL local: http://localhost:3000

Endpoints são definidos nas pastas routes e controllers.
```
</details>

---

<p align="center">© JesusWellerson | Development Innovation</p>
