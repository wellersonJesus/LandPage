// backend/src/db/seed-db.js
import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const dbPath = path.resolve(process.env.SQLITE_PATH_LOCAL || "./wsmanager_local.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("❌ Erro ao conectar no banco:", err.message);
  console.log("🌱 Iniciando seed no banco de dados...");
});

db.serialize(() => {
  // ==================================================
  // EMPRESA
  // ==================================================
  db.run(`
    INSERT INTO empresa (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque)
    VALUES
    ('WS Manager', 'Gestão Simplificada', 'Sistema integrado de gestão empresarial e pessoal.', '12.345.678/0001-99',
     'Tecnologia da Informação', 'São Paulo - SP', 'Automatizar e otimizar processos', 
     'Gestão Financeira, Controle de Projetos, Monitoramento de Recursos', 
     'Painel de Controle Financeiro, Módulo de Contratos');
  `);

  // ==================================================
  // CONTA
  // ==================================================
  db.run(`
    INSERT INTO conta (nome, banco, tipo, saldo, agencia, numero_conta)
    VALUES
    ('Conta Principal', 'Banco do Brasil', 'Corrente', 15000.00, '1234-5', '98765-4'),
    ('Conta Investimentos', 'Nubank', 'Poupança', 8700.50, '0001', '998877-6');
  `);

  // ==================================================
  // GESTAO
  // ==================================================
  db.run(`
    INSERT INTO gestao (data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id)
    VALUES
    ('2025-10-01', 120.5, 200.0, '8h', 1200.00, 400.00, 800.00, 1),
    ('2025-10-02', 95.0, 150.0, '7h', 950.00, 300.00, 650.00, 1);
  `);

  // ==================================================
  // CALENDARIO
  // ==================================================
  db.run(`
    INSERT INTO calendario (data, dia_semana, mes, ano, feriado)
    VALUES
    ('2025-01-01', 'Quarta', 1, 2025, 1),
    ('2025-10-12', 'Domingo', 10, 2025, 1),
    ('2025-10-21', 'Terça', 10, 2025, 0);
  `);

  // ==================================================
  // EMPRESTIMO
  // ==================================================
  db.run(`
    INSERT INTO emprestimo (cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela)
    VALUES
    ('12.345.678/0001-99', 'Empréstimo para expansão do negócio', 10000.00, 2500.00, 7500.00, '2025-11-10', '3/10', 1000.00);
  `);

  // ==================================================
  // LANCAMENTO
  // ==================================================
  db.run(`
    INSERT INTO lancamento (data, descricao, tipo, valor, categoria, conta_id)
    VALUES
    ('2025-10-10', 'Compra de equipamento', 'Despesa', 1200.00, 'Infraestrutura', 1),
    ('2025-10-15', 'Pagamento de serviço', 'Receita', 2500.00, 'Consultoria', 1);
  `);

  // ==================================================
  // MANUTENCAO
  // ==================================================
  db.run(`
    INSERT INTO manutencao (dispositivo_id, data, descricao, custo, status)
    VALUES
    (1, '2025-09-20', 'Troca de SSD', 450.00, 'Concluído'),
    (2, '2025-10-05', 'Atualização de sistema', 0.00, 'Pendente');
  `);

  // ==================================================
  // SERVIDOR
  // ==================================================
  db.run(`
    INSERT INTO servidor (nome, ip, sistema_operacional, status, localizacao)
    VALUES
    ('Servidor Principal', '192.168.0.10', 'Ubuntu Server 22.04', 'Ativo', 'Data Center SP'),
    ('Servidor Backup', '192.168.0.11', 'Debian 12', 'Ativo', 'Data Center SP');
  `);

  // ==================================================
  // DISPOSITIVO
  // ==================================================
  db.run(`
    INSERT INTO dispositivo (nome, tipo, marca, modelo, numero_serie, status)
    VALUES
    ('Notebook Dell', 'Laptop', 'Dell', 'Inspiron 5423', 'SN12345', 'Ativo'),
    ('Roteador TP-Link', 'Rede', 'TP-Link', 'Archer C6', 'SN9988', 'Ativo');
  `);

  // ==================================================
  // REDE
  // ==================================================
  db.run(`
    INSERT INTO rede (nome, ip, mascara, gateway, dns, status)
    VALUES
    ('Rede Interna', '192.168.0.0', '255.255.255.0', '192.168.0.1', '8.8.8.8', 'Operacional');
  `);

  // ==================================================
  // CONTRATO
  // ==================================================
  db.run(`
    INSERT INTO contrato (empresa_id, descricao, valor, data_inicio, data_fim, status)
    VALUES
    (1, 'Contrato de prestação de serviços de TI', 5000.00, '2025-01-01', '2025-12-31', 'Ativo');
  `);

  // ==================================================
  // SKILL
  // ==================================================
  db.run(`
    INSERT INTO skill (nome, nivel, categoria)
    VALUES
    ('JavaScript', 'Avançado', 'Desenvolvimento Web'),
    ('Linux Server', 'Intermediário', 'Infraestrutura'),
    ('SQL', 'Avançado', 'Banco de Dados');
  `);

  // ==================================================
  // PLATAFORMA
  // ==================================================
  db.run(`
    INSERT INTO plataforma (nome, url, tipo)
    VALUES
    ('Udemy', 'https://www.udemy.com', 'Educação'),
    ('Render', 'https://render.com', 'Hospedagem'),
    ('GitLab', 'https://gitlab.com', 'Controle de Versão');
  `);

  // ==================================================
  // CURSO
  // ==================================================
  db.run(`
    INSERT INTO curso (nome, plataforma_id, carga_horaria, progresso)
    VALUES
    ('Curso de Node.js Avançado', 1, '40h', 75),
    ('Git e GitLab Completo', 3, '20h', 100);
  `);

  // ==================================================
  // INVESTIMENTO
  // ==================================================
  db.run(`
    INSERT INTO investimento (tipo, descricao, valor_aplicado, rendimento, data_aplicacao)
    VALUES
    ('CDB', 'Aplicação de liquidez diária', 5000.00, 5.5, '2025-01-15'),
    ('Tesouro Selic', 'Investimento público', 2000.00, 6.2, '2025-03-01');
  `);

  console.log("✅ Seed inserido com sucesso em todas as tabelas!");
});

db.close((err) => {
  if (err) console.error("❌ Erro ao fechar o banco:", err.message);
  else console.log("🌿 Conclusão: Banco fechado após seed.");
});
