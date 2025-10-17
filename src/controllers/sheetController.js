const fetch = require('node-fetch');
const { SHEET_URL } = require('../config/zerosheets');

// Função para carregar a planilha CSV e converter em JSON
async function loadSheetData() {
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
}

// GET /listar
async function listar(req, res) {
    try {
        const data = await loadSheetData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao carregar planilha' });
    }
}

// GET /buscar?campo=Nome&valor=Wellerson
async function buscar(req, res) {
    const { campo, valor } = req.query;
    if (!campo || !valor) return res.status(400).json({ error: 'Parâmetros campo e valor são obrigatórios' });

    try {
        const data = await loadSheetData();
        const result = data.filter(item => item[campo] && item[campo].toLowerCase().includes(valor.toLowerCase()));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

// POST /inserir (não grava na planilha, apenas retorna sucesso)
async function inserir(req, res) {
    const input = req.body;
    if (!input || Object.keys(input).length === 0) return res.status(400).json({ error: 'Nenhum dado enviado' });

    // Limitação: planilha pública não permite inserção direta via CSV
    res.status(200).json({ sucesso: true, mensagem: 'Registro recebido (não gravado na planilha pública)', registro: input });
}

// PUT /atualizar (não grava na planilha, apenas retorna sucesso)
async function atualizar(req, res) {
    const input = req.body;
    if (!input || !input['Nome']) return res.status(400).json({ error: 'Campo Nome obrigatório para atualização' });

    res.status(200).json({ sucesso: true, mensagem: 'Atualização simulada (não gravada na planilha pública)', registro: input });
}

// DELETE /deletar (não grava na planilha, apenas retorna sucesso)
async function deletar(req, res) {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Campo Nome obrigatório para deletar' });

    res.status(200).json({ sucesso: true, mensagem: 'Exclusão simulada (não gravada na planilha pública)', nome });
}

module.exports = { listar, buscar, inserir, atualizar, deletar };
