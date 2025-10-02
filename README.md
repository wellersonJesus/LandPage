# [🌏 WS-gestão](https://ws-gestao-d10f13.gitlab.io/) 

Aplicação web totalmente responsiva. Serviço serverless com armazenamento e processamento de dados. Garante fácil acesso, escalabilidade e manutenção simplificada.

---

## **Tecnologias e Ferramentas Utilizadas**

- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) — Hospedagem sites estáticos  
- [ZeroSheets](https://www.zerosheets.com/) — Backend serverless   
- [HTML](https://www.w3schools.com/html/) — Estruturação da aplicação  
- [CSS](https://www.w3schools.com/css/) — Estilização e layout   
- [Bootstrap](https://getbootstrap.com/) — Framework CSS design responsivo  
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Lógica interatividade frontend  

---

## GitLab CI & Estrutura

Este projeto utiliza **GitLab CI/CD** para build e deploy automático no **GitLab Pages**, seguindo as instruções do arquivo [`.gitlab-ci.yml`](.gitlab-ci.yml).  

<details>
<summary>📂 Clique aqui para expandir a Estrutura do Projeto</summary>

```bash
ws-gestao/
│
├─ public/
│ ├─ index.html           
│ ├─ pages/
│ │ ├─ dashboard.html     
│ │ └─ estoque.html       
│ │
│ ├─ style/
│ │ └─ main.css           
│ │
│ ├─ js/
│ │ ├─ app.js             
│ │ ├─ dashboard.js        
│ │ ├─ login.js           
│ │ ├─ zerosheets.js
│ │ ├─ keys.local.js      # usado LOCAL
│ │ └─ keys.js            # 🔑 gerado pelo CI/CD, não versionar
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
├─ scripts/
│ └─ generate-keys.js     # gera keys.js a partir de .env
│
├─ .env                    # credenciais privadas
├─ .gitignore
├─ .gitlab-ci.yml
└─ README.md
```
</details>

---

## Run WS-gestão

<details>
<summary>🚀 Rodando o App</summary>

```bash
# 1️⃣ Atualiza o sistema e instala Node.js e npm
sudo apt update && sudo apt install nodejs npm -y

# 2️⃣ Inicializa package.json automaticamente
npm init -y

# 3️⃣ Instala dependências necessárias
npm install dotenv live-server --save

# 4️⃣ Gera keys.js a partir do .env e inicia o servidor
npm start

# Instal firebase
npm install firebase
```
</details>

---

<div align="center">
© JesusWellerson | Development Innovation<br>
📍 Belo Horizonte, 27 Setembro 2025<br>
<a href="https://www.linkedin.com/in/wellerson-jesus-37831540/" target="_blank">🔗 LinkedIn</a> | 
<a href="https://github.com/wellersonJesus" target="_blank">📌 GitHub</a>
</div>
