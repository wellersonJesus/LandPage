const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta raiz 'app' (subindo um nível de 'src')
app.use(express.static(path.join(__dirname, '../')));

// Rota Dashboard: Entrega o arquivo dashboard.html
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages/dashboard.html'));
});

// Rota Principal: Redireciona qualquer requisição não estática para o index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor do App rodando em http://localhost:${port}`);
});
