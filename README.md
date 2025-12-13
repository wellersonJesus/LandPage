## [📘 Manager ](https://wellersonJesus.gitlab.io/ws-manager/)

> *Para visualizar este README em modo preview no VS Code: **Ctrl + Shift + V***

**Manager** plataforma de gestão de operações; Organização objetiva, documentação, API estruturada e histórico incremental.

---

#### 1️⃣ Visão Geral do Projeto

Aplicação:

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

> _**Backend:** controla API, banco SQLite, autenticação e seeds.<br>
**Frontend:** interface responsiva consumindo os endpoints REST._

---

#### 3️⃣ Variáveis de Ambiente
##### [🌐 Swagger UI](https://ws-manager-309387.gitlab.io/docs/swagger/)

<details> <summary>📂 Arquivos necessários para rodar o Swagger com PHP</summary>

###### Estrutura recomendada no backend:
```bash
backend/
 ├── public/
 │    ├── index.php
 │    ├── swagger/
 │    │      ├── swagger.json
 │    │      ├── index.html
 │    │      └── swagger-ui.css / .js  (gerados pelo pacote)
 ├── src/
 │    └── ...
 ├── swagger.yaml      ← arquivo principal da documentação
 ├── generate-swagger.php
 ├── composer.json
 └── ...
```
📌 1. Instalar dependência YAML → JSON

Dentro da pasta backend/:
> composer require zircote/swagger-php 
> composer require symfony/yaml
> php vendor/bin/openapi src/ -o public/swagger.json

📌 2. Converter automaticamente swagger.yaml → swagger.json

```bash
backend/generate-swagger.php #Criar o arquivo
php generate-swagger.php     #Rodar a conversão 
```

📌 3. Adicionar Swagger UI no backend

> Entre na pasta: _[backend/public/swagger/]()_

```bash
#Baixar o Swagger UI:
curl -L https://github.com/swagger-api/swagger-ui/archive/refs/heads/master.zip -o swagger.zip
unzip swagger.zip
mv swagger-ui-master/dist/* .
rm -rf swagger-ui-master swagger.zip
```
📌 4. Testar no navegador

> Local: _[http://localhost:8000/swagger/]()_
Produção (Render): _[https://seu-backend.onrender.com/swagger/]()_

📌 6. Atualizar a documentação após alterar o YAML
```bash
php generate-swagger.php
```

</details>

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
> Acesse: [http://localhost:8000]()

[📂 Acessar schema do banco](./backend/src/databases/DATABASE_SCHEMA.md)

Criar/Atualizar o banco (migrations)

```bash
rm ./wsmanager_local.db   # ou o caminho correto
php run-migrations.php    # cd backend/src/databases/:
php seed-db.php           # Popular o banco (seeds)

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
Root Directory: `backend`           #Aponte para diretorio backend 
Start Command: `npm start`          #Start app no Render
Environment Variables: (as do .env) #Variaveis de ambiente usadas
```
_Backend ficará acessível por URL pública, usada no frontend:_

> API_BASE_URL_PROD: https://seu-backend.onrender.com

---

<div align="center"><strong>© JesusWellerson | Development Innovation</strong></div>
