# [🌏 WS-gestão](https://ws-gestao-d10f13.gitlab.io/) 

Este projeto é uma aplicação web totalmente responsiva. Com serviço serverless para armazenamento e processamento de dados. Garante fácil acesso, escalabilidade e manutenção simplificada.

---

## **Tecnologias e Ferramentas Utilizadas**

- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) — Hospedagem gratuita para sites estáticos  
- [ZeroSheets](https://www.zerosheets.com/) — Backend serverless para manipulação de dados em planilhas  
- [HTML](https://www.w3schools.com/html/) — Estruturação do conteúdo da aplicação  
- [CSS](https://www.w3schools.com/css/) — Estilização e layout da aplicação  
- [Bootstrap](https://getbootstrap.com/) — Framework CSS para design responsivo  
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Lógica e interatividade no frontend  

---

## GitLab CI & Estrutura

Este projeto utiliza **GitLab CI/CD** para build e deploy automático no **GitLab Pages**, seguindo as instruções do arquivo [`.gitlab-ci.yml`](.gitlab-ci.yml).  

<details>
<summary>📂 Clique aqui para expandir a Estrutura do Projeto</summary>

```bash
ws-gestao/
│
├─ public/
│ ├─ index.html           # Página principal / Login
│ ├─ pages/
│ │ ├─ dashboard.html     # Dashboard após login
│ │ └─ estoque.html       # Página de Estoque
│ │
│ ├─ style/
│ │ └─ main.css           # Estilos globais (Bootstrap + custom)
│ │
│ ├─ js/
│ │ ├─ app.js             # JS principal (login, navegação)
│ │ ├─ dashboard.js       # JS da tela de dashboard
│ │ └─ zerosheets.js      # Integração com ZeroSheets
│ │
│ ├─ components/
│ │ ├─ header.html
│ │ ├─ footer.html
│ │ └─ form-insert.html
│ │
│ └─ img/
│   └─ logo.jpg
│
├─ data/
│ └─ exemplo.json
│
├─ credentials/           # 🔑 Tokens e keys (não versionar)
│ ├─ keys.example.json
│ └─ keys.json
│
├─ .env
├─ .gitignore
├─ .gitlab-ci.yml
└─ README.md
```
</details>

---

<details>
<summary>🚀 Rodando o App</summary>

```bash
# 1️⃣ Instalar Node.js e npm (Linux/Ubuntu)
sudo apt update
sudo apt install nodejs npm -y
node -v
npm -v

# 2️⃣ Instalar servidor local (live-server e http-server)
npm install -g live-server http-server

# 3️⃣ Entrar na pasta do projeto
cd ws-gestao/public

# 4️⃣ Rodar o projeto
live-server public

# 5️⃣ Parar o servidor
# Pressione Ctrl + C no terminal onde o servidor está rodando
⚡ Observação: no GitLab Pages, todos os arquivos são publicados a partir da pasta public/.
Certifique-se de mover os arquivos finais para public/ ou ajustar o .gitlab-ci.yml conforme necessário.
```
</details>

---

<div align="center">
© JesusWellerson | Development Innovation<br>
📍 Belo Horizonte, 26 Setembro 2025<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">🔗 LinkedIn</a> | 
<a href="https://github.com/wellersonJesus" target="_blank">📌 GitHub</a>
</div>
