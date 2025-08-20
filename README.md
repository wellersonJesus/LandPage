**WS-gestão** Este projeto é uma aplicação web totalmente responsiva. Com serviço serverless para armazenamento e processamento de dados. Garante fácil acesso, escalabilidade e manutenção simplificada.

---

<!-- Ferramentas utilizadas -->

**Tecnologias e Ferramentas Utilizadas**

- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) — Hospedagem gratuita para sites estáticos.  
- [ZeroSheets](https://www.zerosheets.com/) — Backend serverless para manipulação de dados em planilhas.  
- [HTML](https://www.w3schools.com/html/) — Estruturação do conteúdo da aplicação.  
- [CSS](https://www.w3schools.com/css/) — Estilização e layout da aplicação.  
- [Bootstrap](https://getbootstrap.com/) — Framework CSS para design responsivo.  
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) — Lógica e interatividade no frontend.

<!-- Estrutura do Projeto -->

## GitLab CI & Estrutura

Este projeto utiliza **GitLab CI/CD** para build e deploy automático no **GitLab Pages**, seguindo as instruções do arquivo [`.gitlab-ci.yml`](.gitlab-ci.yml). 
 
Abaixo está a estrutura de diretórios e arquivos do projeto:

```
ws-gestao/
│
├─ index.html               # Página principal / login
├─ dashboard.html           # Dashboard após login
├─ style/                  
│   └─ main.css             # Estilos globais (Bootstrap já incluído)
├─ js/
│   ├─ app.js               # JS principal (login, navegação)
│   ├─ dashboard.js         # JS do dashboard, manipula JSON
│   └─ zerosheets.js        # Funções para ler/escrever na ZeroSheets
├─ data/
│   └─ exemplo.json         # JSON de exemplo (pode simular ZeroSheets)
├─ components/              # Componentes HTML reutilizáveis
│   ├─ header.html
│   ├─ footer.html
│   └─ form-insert.html     # Formulário de inserção de dados
├─ assets/                  
│   ├─ images/              # Imagens do projeto
│   └─ icons/               # Ícones
└─ README.md                # Documentação do projeto

```

⚡ **Observação**: no GitLab Pages, todos os arquivos são publicados a partir da pasta `public/`.  
Certifique-se de mover os arquivos finais para `public/` ou ajustar o `.gitlab-ci.yml` conforme necessário.

---

## 📌 Créditos  

<div align="center">

© **JesusWellerson | Development Innovation**  
📍 Belo Horizonte, 20 Agosto 2024  
🔗 [LinkedIn](https://www.linkedin.com) | [GitHub](https://www.github.com)

</div>
