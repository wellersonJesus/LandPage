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

![#759e9e](https://placehold.co/80x80/759e9e/759e9e.png) ![#97b6b6](https://placehold.co/80x80/97b6b6/97b6b6.png) ![#bacece](https://placehold.co/80x80/bacece/bacece.png) ![#dce7e7](https://placehold.co/80x80/dce7e7/dce7e7.png) ![#ffffff](https://placehold.co/80x80/ffffff/ffffff.png)

`#759e9e` `#97b6b6` `#bacece` `#dce7e7` `#ffffff`

---

<div align="center">
© JesusWellerson | Development | SRE | Software Architect | Software Engineer
<br>
