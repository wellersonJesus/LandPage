const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta raiz 'app' (subindo dois níveis de 'src/Services')
app.use(express.static(path.join(__dirname, '../../')));

// Rota Principal: Redireciona qualquer requisição não estática para o index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Pages/index.html'));
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
