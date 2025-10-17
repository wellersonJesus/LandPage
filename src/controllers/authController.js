const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const { SHEET_URL } = require('../config/zerosheets');

const DATA_FILE = path.join(__dirname, '../../data.json');

// Função para carregar a planilha CSV e converter em JSON
async function loadSheetData() {
    try {
        const res = await fetch(SHEET_URL);
        const csvText = await res.text();

        const lines = csvText.trim().split('\n');
        const headers = lines.shift().split(',').map(h => h.trim());
        const data = lines.map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i]);
            return obj;
        });

        return data;
    } catch (err) {
        console.error('Erro ao carregar planilha:', err);
        return [];
    }
}

// Salva dados localmente em data.json
function saveDataLocal(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// GET /listar
async function listar(req, res) {
    let data = [];
    // Se existir data.json local, usa ele
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } else {
        data = await loadSheetData();
        saveDataLocal(data);
    }
    res.json(data);
}

// GET /buscar?campo=Nome&valor=Wellerson
async function buscar(req, res) {
    const { campo, valor } = req.query;
    if (!campo || !valor) return res.status(400).json({ error: 'Parâmetros campo e valor são obrigatórios' });

    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } else {
        data = await loadSheetData();
        saveDataLocal(data);
    }

    const result = data.filter(item => item[campo] && item[campo].toLowerCase().includes(valor.toLowerCase()));
    res.json(result);
}

// POST /inserir
async function inserir(req, res) {
    const input = req.body;
    if (!input || Object.keys(input).length === 0) return res.status(400).json({ error: 'Nenhum dado enviado' });

    let data = [];
    if (fs.existsSync(DATA_FILE)) data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    data.push(input);
    saveDataLocal(data);

    res.json({ sucesso: true, registro: input });
}

// PUT /atualizar
async function atualizar(req, res) {
    const input = req.body;
    const chave = input['Nome']; // Assume Nome como chave principal
    if (!chave) return res.status(400).json({ error: 'Campo Nome obrigatório para atualização' });

    if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: 'Arquivo de dados não encontrado' });
    let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    let updated = false;
    for (let i = 0; i < data.length; i++) {
        if (data[i]['Nome'] === chave) {
            data[i] = { ...data[i], ...input };
            updated = true;
            break;
        }
    }

    if (!updated) return res.status(404).json({ error: 'Registro não encontrado' });

    saveDataLocal(data);
    res.json({ sucesso: true, registro: input });
}

// DELETE /deletar
async function deletar(req, res) {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Campo Nome obrigatório para deletar' });

    if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: 'Arquivo de dados não encontrado' });
    let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const originalLength = data.length;

    data = data.filter(item => item['Nome'] !== nome);

    saveDataLocal(data);
    res.json({ sucesso: data.length < originalLength });
}

module.exports = { listar, buscar, inserir, atualizar, deletar };
