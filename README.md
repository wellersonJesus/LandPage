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

##  Guia de Instalação e Execução

Siga a ordem abaixo para configurar e rodar o projeto.

### 1. Database

```bash
# Comandos migrates  
rm -f api/src/Database/db/landpage.db
php api/src/Database/init_db.php
php api/src/Database/seeds.php
```

### 2. API

```bash
# Instalar dependências da API
cd api
composer install
composer dump-autoload
cd ..
```

### 3. APP

```bash
# Instalar dependências do Frontend 
cd app
npm install
npm start
cd ..
```

### 4. Executar Aplicação (Em terminais separados)

```bash
php -S localhost:8000 -t api/public
```

### 5 Deploy

```bash
### Deploy api restfull
cd landpage
run start landpage
run deploy
```

## Estrutura de commits

| Commit | Descrição |
|---|---|
| feat: | Nova funcionalidade.|
| fix:  | Resolve um bug ou erro.|
| refactor: | Alterações no código.| 
| style: | Mudananças (espaços, formatação, ponto e vírgula, etc.).|
| perf: | Alterações de melhorar desempenho/performance.| 
| test: | Adição ou correção de testes existentes.|
| build: | Mudanças que afetam o sistema de build ou dependências (ex: npm, composer, docker).|
| ci: | Alterações em arquivos e scripts de configuração.| 
| docs: | Mudanças apenas na documentação (README, comentários no código).|
| chore: | Tarefas de manutenção que não modificam o código fonte ou os testes (ex: atualizar o .gitignore).|
| revert: | Quando você desfaz (reverte) um commit anterior.| 

## Link & acesso

| Documentação | Acesso | Status |
|---|---|---|
| API | [localhost:8000](http://localhost:8000/?) |  ✅ Implementado |
| APP | [localhost:3000](http://localhost:3000/?) |  ✅ Implementado |
| Swagger | [doc - Landpage](http://localhost:8000/docs/Swagger/) | ✅ Implementado |


## 🎨 Paleta de Cores

![#759e9e](https://placehold.co/80x80/759e9e/759e9e.png) ![#97b6b6](https://placehold.co/80x80/97b6b6/97b6b6.png) ![#bacece](https://placehold.co/80x80/bacece/bacece.png) ![#dce7e7](https://placehold.co/80x80/dce7e7/dce7e7.png) ![#ffffff](https://placehold.co/80x80/ffffff/ffffff.png)

`#759e9e` - `#97b6b6` - `#bacece` - `#dce7e7` - `#ffffff`

---

<div align="center">
© JesusWellerson | Development | SRE | Software Architect | Software Engineer
<br>
