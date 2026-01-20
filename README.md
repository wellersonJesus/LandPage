# 🚀 Plataforma de gestão de operações

Arquitetura desacoplada (SPA + API RESTful).

## 🛠 Tecnologias
- PHP 
- Angular 
- JavaScript 
- Bootstrap 
- HTML 
- CSS

## 📦 Instalação de Dependências

Antes de executar qualquer comando de banco de dados ou iniciar a API, é obrigatório instalar as dependências do backend:

```bash
cd api && composer install && cd ..
```

### Database

```bash
# Criar/Rodar Migrates: 
php api/src/Database/init_db.php

# Rodar Seeds: 
php api/src/Database/seeds.php

# Apagar Migrates (Reset) 
rm api/database/database.sqlite && php api/src/Database/init_db.php
```

### Run API - API - Deploy

```bash
### run api backend
php -S localhost:8000 -t api/public

### Frontend
run api frontend

### Geral
run start landpage
run deploy
```

## 📚 Documentação Swagger
A documentação da API é gerada via Swagger.

## Paleta de Cores

```bash
#759e9e #97b6b6 #bacece  #dce7e7 #ffffff
```

---

<div align="center">
© JesusWellerson | Development | SRE | Software Architect | Software Engineer
<br>
