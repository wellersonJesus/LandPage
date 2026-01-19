<?php

$migration = <<<SQL
CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT,
    role TEXT
);

CREATE TABLE IF NOT EXISTS empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    slogan TEXT,
    descricao TEXT,
    cnpj TEXT UNIQUE,
    atividade TEXT,
    localizacao TEXT,
    missao TEXT,
    servicos TEXT,
    projetos_destaque TEXT
);

CREATE TABLE IF NOT EXISTS gestao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATE,
    km_percorrido REAL,
    meta REAL,
    horas_trabalhadas TEXT,
    receita REAL,
    despesa REAL,
    lucro REAL,
    conta INTEGER
);

CREATE TABLE IF NOT EXISTS calendario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATE,
    dia_semana TEXT,
    mes INTEGER,
    ano INTEGER,
    feriado BOOLEAN
);

CREATE TABLE IF NOT EXISTS emprestimo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj TEXT,
    descricao TEXT,
    valor_total REAL,
    valor_pago REAL,
    valor_a_pagar REAL,
    data_parcela DATE,
    numero_parcela TEXT,
    valor_parcela REAL
);

CREATE TABLE IF NOT EXISTS lancamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ano INTEGER,
    mes INTEGER,
    descricao TEXT,
    valor REAL,
    categoria TEXT
);

CREATE TABLE IF NOT EXISTS manutencao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_manutencao TEXT,
    data_ultima DATE,
    valor_pago REAL,
    data_proxima DATE
);

CREATE TABLE IF NOT EXISTS conta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titular TEXT,
    tipo_conta TEXT,
    identificador TEXT
);

CREATE TABLE IF NOT EXISTS servidor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    servico TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT,
    frase TEXT
);

CREATE TABLE IF NOT EXISTS dispositivo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dispositivo TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS rede (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT,
    descricao TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS contrato (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_contrato TEXT,
    data_inicio DATE,
    data_vigencia DATE,
    duracao TEXT,
    descricao TEXT,
    remuneracao TEXT,
    aparelho TEXT,
    chip TEXT,
    email_contato TEXT,
    telefone_contato TEXT,
    login TEXT,
    banco TEXT,
    pix TEXT,
    recebimentos TEXT,
    mei TEXT,
    gestao_financeira TEXT,
    parceria_empresarial TEXT
);

CREATE TABLE IF NOT EXISTS skill (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    categoria TEXT,
    nivel TEXT
);

CREATE TABLE IF NOT EXISTS curso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS plataforma (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS investimento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT,
    descricao TEXT,
    valor_investido REAL,
    valor_atual REAL,
    data_inicio DATE,
    data_vencimento DATE
);
SQL;