## [📘 Manager ](https://wellersonJesus.gitlab.io/ws-manager/)

> *Para visualizar este README em modo preview no VS Code: **Ctrl + Shift + V***

**Manager** plataforma de gestão de operações; Organização objetiva, documentação, API estruturada e histórico incremental.

---

#### 1️⃣ Visão Geral do Projeto

Aplicação completa com:

* **Frontend (SPA)**: Angular + Bootstrap
* **Backend**: PHP + SQLite
* **API RESTful** para CRUD para entidades
* **Autenticação**, backup incremental, histórico JSON e ambiente para deploy
* **Hospedagem**:
  * GitLab Pages → Frontend
  * Render → Backend
---

#### 2️⃣ Estrutura Principal do Repositório

```bash
WS-Manager/
 ├── backend/          # API (PHP), controllers, seeds, config
 ├── frontend/         # Angular + Bootstrap (SPA)
 ├── sql/              # Scripts SQL auxiliares
 ├── src/              # Scripts gerais e tools
 ├── package.json      # Dependências globais
 ├── version           # Versão atual do app
 └── README.md         # Este arquivo
```

> _**Backend:** controla API, banco SQLite, autenticação e seeds.
**Frontend:** interface responsiva consumindo os endpoints REST._

---

#### 3️⃣ Variáveis de Ambiente
##### 3.1️⃣ Documentação Swagger da API

✅ Arquivos necessários para rodar o Swagger com PHP

```bash
#A estrutura recomendada no seu backend:
backend/
 ├── public/
 │    ├── index.php
 │    ├── swagger/
 │    │      ├── swagger.json
 │    │      ├── index.html
 │    │      └── swagger-ui.css / .js  (auto)
 ├── src/
 │    └── ...
 ├── swagger.yaml   ← seu arquivo atual
 ├── composer.json
 └── ...
```
📌 1. Instalar dependência para converter YAML → JSON
Dentro da pasta backend/:
> composer require symfony/yaml

📌 2. Converter automaticamente o swagger.yaml para swagger.json

```bash
#Crie o arquivo:
backend/generate-swagger.php

#Rodar:
php generate-swagger.php
```
📌 3. Adicionar Swagger UI no backend

> Entre na pasta: **_backend/public/swagger/_**

```bash
#Baixe o Swagger UI:
curl -L https://github.com/swagger-api/swagger-ui/archive/refs/heads/master.zip -o swagger.zip
unzip swagger.zip
mv swagger-ui-master/dist/* .
rm -rf swagger-ui-master swagger.zip
```

📌 4. Editar o index.html do Swagger

> Arquivo: **_backend/public/swagger/index.html_**
Procure por: **_url: "https://petstore.swagger.io/v2/swagger.json"_**


Troque por:
> url: **_"./swagger.json"_**

📌 5. Testar no navegador

> Local: http://localhost:8000/swagger/
Produção (Render): https://seu-backend.onrender.com/swagger/

📌 6. Atualizar Swagger sempre que editar o YAML
> php generate-swagger.php

##### 3.2️⃣ .env 
_Crie um arquivo .env com as configurações necessárias:_

```bash
#Banco de Dados
SQLITE_PATH_LOCAL=./src/databases/wsmanager_local.db
SQLITE_PATH_PROD=./src/databases/wsmanager_producao.db

#Usuários Iniciais
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
USER_PASSWORD=...

#JWT
JWT_SECRET=chave-secreta
JWT_EXPIRES_IN=8h
JWT_COOKIE_NAME=ws_token
```

> _As chaves são essenciais para autenticação e integração com o frontend._

---

##### 4️⃣ Execução Rápida (Dev)

##### 🔧 Backend
```bash
cd backend
npm install            # Dependências PHP
php -S localhost:8000 -t public # Inicia servidor
```
> Acesse: [http://localhost:3000]()

##### Banco local:
```bash
node src/db/init-db.js
node src/db/seed-db.js
```
##### 🌐 Frontend
```bash
cd frontend
npm install
ng serve --open
```
> Acesse: [http://localhost:4200]()

---

#### 5️⃣ Deploy (GitLab Pages + Render)

##### 🌍 GitLab Pages (Frontend)

```bash
ng build --configuration production --base-href=/ws-manager/
```

Resultado final em:

```
dist/frontend/
```

Faça commit → o pipeline envia para o GitLab Pages automaticamente.

#### 🚀 Render (Backend)

```bash
#Aponte para diretorio backend 
- Root Directory: `backend`

#Start app no Render
- Start Command: `npm start`

#Variaveis de ambiente usadas
- Environment Variables: (as do .env)
```
_Backend ficará acessível por URL pública, usada no frontend:_

> API_BASE_URL_PROD: https://seu-backend.onrender.com

---

<div align="center"><strong>© JesusWellerson | Development Innovation</strong></div>
