----
----
----
----
----
----
# 📘 Landpage Project

Plataforma de gestão de operações com arquitetura desacoplada (SPA + API RESTful).

---

## 🚀 Tech Stack

| Camada | Linguagem | Tecnologias |
| :--- | :--- | :--- |
| **Frontend** | JavaScript | Angular, Bootstrap |
| **Backend** | PHP | Slim Framework, SQLite |
| **Auth** | - | JWT (JSON Web Tokens) |

---

## 🛠 Gerenciamento Simplificado

Para facilitar a configuração e execução, utilize o script `landpage.sh` na raiz do projeto.

### 1. Configuração Inicial

Dê permissão de execução ao script e configure o ambiente:

```bash
chmod +x landpage.sh
cp backend/.env.example backend/.env
```

> **Nota:** Edite o arquivo `backend/.env` se necessário (ex: definir `JWT_SECRET`).

### 2. Instalação e Banco de Dados

```bash
# Instala dependências (Backend + Frontend)
./landpage.sh install

# Reseta o banco de dados (Cria tabelas + Popula dados iniciais)
./landpage.sh db:reset
```

### 3. Executando o Projeto

Abra **dois terminais** na raiz do projeto:

**Terminal 1 (Backend API):**
```bash
./landpage.sh start:back
```
> API disponível em: http://localhost:8000

**Terminal 2 (Frontend SPA):**
```bash
./landpage.sh start:front
```
> Aplicação disponível em: http://localhost:4200

---

## 📂 Estrutura do Projeto

```
landpage/
 ├── backend/           # API RESTful (PHP Slim)
 │    ├── src/          # Código fonte (Controllers, Models, Database)
 │    ├── public/       # Entry point do servidor web
 │    └── vendor/       # Dependências (Composer)
 ├── frontend/          # Aplicação SPA (Angular)
 │    ├── src/          # Componentes, Services, Pages
 │    └── dist/         # Build de produção
 └── landpage.sh          # Script de automação
```

---

## 🔌 Exemplos de API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Health Check |
| `POST` | `/auth/login` | Autenticação (Retorna JWT) |
| `GET` | `/empresas` | Listagem de empresas (Auth Required) |

---

## ⚙️ Comandos do `landpage.sh`

| Comando | Descrição |
| :--- | :--- |
| `./landpage.sh install` | Instala dependências (Composer + NPM) |
| `./landpage.sh db:migrate` | Executa migrations pendentes |
| `./landpage.sh db:seed` | Popula o banco com dados de teste |
| `./landpage.sh db:reset` | Apaga o banco e recria do zero |
| `./landpage.sh start:back` | Inicia servidor PHP (8000) |
| `./landpage.sh start:front` | Inicia servidor Angular (4200) |

---

<div align="center"><strong>© JesusWellerson | Development Innovation</strong></div>
