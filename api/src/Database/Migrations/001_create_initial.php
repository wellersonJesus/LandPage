<?php

return <<<SQL
CREATE TABLE IF NOT EXISTS USUARIO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT,
    role TEXT,
    created_at DATETIME
);

CREATE TABLE IF NOT EXISTS EMPRESA (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    slogan TEXT,
    descricao TEXT,
    cnpj TEXT,
    atividade TEXT,
    localizacao TEXT,
    missao TEXT,
    servicos TEXT,
    projetos_destaque TEXT
);

CREATE TABLE IF NOT EXISTS SERVIDOR (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    servico TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT,
    frase TEXT
);

CREATE TABLE IF NOT EXISTS GESTAO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATE,
    km_percorrido REAL,
    meta REAL,
    horas_trabalhadas TEXT,
    receita REAL,
    despesa REAL,
    lucro REAL,
    conta REAL
);

CREATE TABLE IF NOT EXISTS DISPOSITIVO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dispositivo TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS CALENDARIO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATE,
    dia_semana TEXT,
    mes INTEGER,
    ano INTEGER,
    feriado BOOLEAN
);

CREATE TABLE IF NOT EXISTS EMPRESTIMO (
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

CREATE TABLE IF NOT EXISTS MANUTENCAO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_manutencao TEXT,
    data_ultima DATE,
    valor_pago REAL,
    data_proxima DATE
);

CREATE TABLE IF NOT EXISTS SKILL (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    categoria TEXT,
    nivel TEXT
);

CREATE TABLE IF NOT EXISTS CURSO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS REDE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoria TEXT,
    descricao TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT
);

CREATE TABLE IF NOT EXISTS PLATAFORMA (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    servidor_id INTEGER,
    nome TEXT,
    email TEXT,
    usuario TEXT,
    senha TEXT,
    tokens TEXT,
    FOREIGN KEY (servidor_id) REFERENCES SERVIDOR(id)
);

CREATE TABLE IF NOT EXISTS LANCAMENTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gestao_id INTEGER,
    ano INTEGER,
    mes INTEGER,
    descricao TEXT,
    valor REAL,
    categoria TEXT,
    FOREIGN KEY (gestao_id) REFERENCES GESTAO(id)
);

CREATE TABLE IF NOT EXISTS CONTRATO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    empresa_id INTEGER,
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
    parceria_empresarial TEXT,
    FOREIGN KEY (empresa_id) REFERENCES EMPRESA(id)
);

CREATE TABLE IF NOT EXISTS CONTA (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contrato_id INTEGER,
    dispositivo_id INTEGER,
    titular TEXT,
    tipo_conta TEXT,
    identificador TEXT,
    FOREIGN KEY (contrato_id) REFERENCES CONTRATO(id),
    FOREIGN KEY (dispositivo_id) REFERENCES DISPOSITIVO(id)
);

CREATE TABLE IF NOT EXISTS INVESTIMENTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contrato_id INTEGER,
    tipo TEXT,
    descricao TEXT,
    valor_investido REAL,
    valor_atual REAL,
    data_inicio DATE,
    data_vencimento DATE,
    FOREIGN KEY (contrato_id) REFERENCES CONTRATO(id)
);
SQL;