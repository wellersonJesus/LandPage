# 🚀 Plataforma de gestão de operações

Arquitetura desacoplada (SPA + API RESTful).

## 🛠 Tecnologias
<div style="display: inline-block">
    <img align="center" alt="PHP" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg">
    <img align="center" alt="Angular" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg">
    <img align="center" alt="JavaScript" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg">
    <img align="center" alt="Bootstrap" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg">
    <img align="center" alt="HTML5" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg">
    <img align="center" alt="CSS3" height="40" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg">
</div>

## 📦 Instalação de Dependências

Antes de executar qualquer comando de banco de dados ou iniciar a API, é obrigatório instalar as dependências do backend:

```bash
cd api && composer install && cd ..
```

## Database

```bash
# Criar/Rodar Migrates: 
php api/src/Database/init_db.php

# Rodar Seeds: 
php api/src/Database/seeds.php

# Apagar Migrates (Reset) 
rm api/database/database.sqlite && php api/src/Database/init_db.php
```

## Run API - API

```bash
### run api backend
php -S localhost:8000 -t api/public

### Frontend
run api frontend
```

## Deploy

```bash
### Deploy api restfull
run start landpage
run deploy
```

## 📚 Documentação Swagger
A documentação da API é gerada via Swagger.

## 🎨 Paleta de Cores

<div style="display: flex; gap: 15px;">
    <div title="#759e9e" style="width: 50px; height: 50px; border-radius: 50%; background-color: #759e9e;"></div>
    <div title="#97b6b6" style="width: 50px; height: 50px; border-radius: 50%; background-color: #97b6b6;"></div>
    <div title="#bacece" style="width: 50px; height: 50px; border-radius: 50%; background-color: #bacece;"></div>
    <div title="#dce7e7" style="width: 50px; height: 50px; border-radius: 50%; background-color: #dce7e7;"></div>
    <div title="#ffffff" style="width: 50px; height: 50px; border-radius: 50%; background-color: #ffffff; border: 1px solid #ccc;"></div>
</div>

---

<div align="center">
© JesusWellerson | Development | SRE | Software Architect | Software Engineer
<br>
