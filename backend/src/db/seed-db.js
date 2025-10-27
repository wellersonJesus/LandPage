// backend/src/db/seed-db.js
import db from './dbConnection.js';

db.serialize(() => {
  console.log('🚀 Inserindo dados iniciais...');

  // --- Empresa ---
  const empresas = [
    ['TechCorp', 'Inovação e Futuro', 'Empresa de tecnologia', '12.345.678/0001-90', 'TI', 'São Paulo', 'Transformar o mundo', 'Software, Consultoria', 'Projeto X'],
    ['HealthPlus', 'Saúde e Bem-estar', 'Clínica de saúde', '98.765.432/0001-10', 'Saúde', 'Rio de Janeiro', 'Cuidar de pessoas', 'Atendimento, Exames', 'Projeto Y'],
    ['EduSmart', 'Aprendizado Inteligente', 'Plataforma educacional', '11.222.333/0001-44', 'Educação', 'Belo Horizonte', 'Ensinar de forma inovadora', 'Cursos online, Tutorias', 'Projeto Z']
  ];

  empresas.forEach(params => {
    db.run(
      `INSERT INTO empresa (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Empresa seed:', err.message); }
    );
  });

  // --- Conta ---
  const contas = [
    ['Conta Principal', 'Banco XYZ', 'Corrente', 100000.00, '1234', '56789-0', 1, 1], // contrato_id = 1, dispositivo_id = 1
    ['Conta Secundária', 'Banco ABC', 'Poupança', 50000.00, '5678', '12345-6', 2, 2],  // contrato_id = 2, dispositivo_id = 2
    ['Conta Investimento', 'Banco DEF', 'Investimento', 200000.00, '9101', '11223-4', 3, 3] // contrato_id = 3, dispositivo_id = 3
  ];

  contas.forEach(params => {
    db.run(
      `INSERT INTO conta (nome, banco, tipo, saldo, agencia, numero_conta, contrato_id, dispositivo_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Conta seed:', err.message); }
    );
  });

  // --- Gestao ---
  const gestoes = [
    ['2025-10-24', 120, 150, '8h', 5000, 2000, 3000, 1],
    ['2025-10-25', 90, 120, '7h', 4000, 1500, 2500, 2],
    ['2025-10-26', 150, 180, '9h', 6000, 2500, 3500, 3]
  ];

  gestoes.forEach(params => {
    db.run(
      `INSERT INTO gestao (data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Gestao seed:', err.message); }
    );
  });

  // --- Calendario ---
  const calendarios = [
    ['2025-12-25', 'quinta-feira', 12, 2025, 1],
    ['2025-01-01', 'quarta-feira', 1, 2025, 1],
    ['2025-04-21', 'segunda-feira', 4, 2025, 1]
  ];

  calendarios.forEach(params => {
    db.run(
      `INSERT INTO calendario (data, dia_semana, mes, ano, feriado) VALUES (?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Calendario seed:', err.message); }
    );
  });

  // --- Emprestimo ---
  const emprestimos = [
    ['12.345.678/0001-90', 'Empréstimo inicial', 50000, 10000, 40000, '2025-11-01', '1/12', 4166.66],
    ['98.765.432/0001-10', 'Empréstimo expansão', 30000, 5000, 25000, '2025-11-05', '1/10', 2500],
    ['11.222.333/0001-44', 'Empréstimo equipamento', 20000, 2000, 18000, '2025-11-10', '1/8', 2250]
  ];

  emprestimos.forEach(params => {
    db.run(
      `INSERT INTO emprestimo (cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Emprestimo seed:', err.message); }
    );
  });

  // --- Lancamento ---
  const lancamentos = [
    // data, descricao, tipo, valor, categoria, conta_id, gestao_id
    ['2025-10-24', 'Venda Produto X', 'Receita', 2000, 'Vendas', 1, 1],
    ['2025-10-25', 'Compra Materiais', 'Despesa', 500, 'Suprimentos', 2, 1],
    ['2025-10-26', 'Serviço contratado', 'Receita', 3000, 'Serviços', 3, 2]
  ];

  lancamentos.forEach(params => {
    db.run(
      `INSERT INTO lancamento (data, descricao, tipo, valor, categoria, conta_id, gestao_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Lancamento seed:', err.message); }
    );
  });

  // --- Dispositivo ---
  const dispositivos = [
    ['Notebook Dev', 'Notebook', 'Dell', 'Inspiron 5423', 'SN123456', 'Ativo'],
    ['Impressora Laser', 'Impressora', 'HP', 'LaserJet Pro', 'SN654321', 'Ativo'],
    ['Servidor Backup', 'Servidor', 'Lenovo', 'ThinkServer', 'SN987654', 'Ativo']
  ];

  dispositivos.forEach(params => {
    db.run(
      `INSERT INTO dispositivo (nome, tipo, marca, modelo, numero_serie, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Dispositivo seed:', err.message); }
    );
  });

  // --- Manutencao ---
  const manutencoes = [
    [1, '2025-10-20', 'Troca de HD', 500, 'Concluída'],
    [2, '2025-10-21', 'Limpeza de impressora', 100, 'Concluída'],
    [3, '2025-10-22', 'Atualização do servidor', 300, 'Em andamento']
  ];

  manutencoes.forEach(params => {
    db.run(
      `INSERT INTO manutencao (dispositivo_id, data, descricao, custo, status)
       VALUES (?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Manutencao seed:', err.message); }
    );
  });

  // --- Servidor ---
  const servidores = [
    ['Servidor Principal', '192.168.0.1', 'Ubuntu 22.04', 'Ativo', 'Data Center SP'],
    ['Servidor Backup', '192.168.0.2', 'Ubuntu 22.04', 'Ativo', 'Data Center RJ'],
    ['Servidor Web', '192.168.0.3', 'Ubuntu 22.04', 'Ativo', 'Data Center BH']
  ];

  servidores.forEach(params => {
    db.run(
      `INSERT INTO servidor (nome, ip, sistema_operacional, status, localizacao)
       VALUES (?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Servidor seed:', err.message); }
    );
  });

  // --- Rede ---
  const redes = [
    ['Rede Interna', '192.168.0.0', '255.255.255.0', '192.168.0.1', '8.8.8.8', 'Ativa'],
    ['Rede Backup', '192.168.1.0', '255.255.255.0', '192.168.1.1', '8.8.4.4', 'Ativa'],
    ['Rede Guest', '192.168.2.0', '255.255.255.0', '192.168.2.1', '1.1.1.1', 'Ativa']
  ];

  redes.forEach(params => {
    db.run(
      `INSERT INTO rede (nome, ip, mascara, gateway, dns, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Rede seed:', err.message); }
    );
  });

  // --- Contrato ---
  const contratos = [
    [1, 'Contrato de Suporte', 12000, '2025-01-01', '2025-12-31', 'Ativo'],
    [2, 'Contrato de Saúde', 8000, '2025-03-01', '2025-12-31', 'Ativo'],
    [3, 'Contrato Educacional', 15000, '2025-02-01', '2025-12-31', 'Ativo']
  ];

  contratos.forEach(params => {
    db.run(
      `INSERT INTO contrato (empresa_id, descricao, valor, data_inicio, data_fim, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Contrato seed:', err.message); }
    );
  });

  // --- Skill ---
  const skills = [
    ['JavaScript', 'Avançado', 'Programação'],
    ['Python', 'Intermediário', 'Programação'],
    ['SQL', 'Avançado', 'Banco de Dados']
  ];

  skills.forEach(params => {
    db.run(
      `INSERT INTO skill (nome, nivel, categoria)
       VALUES (?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Skill seed:', err.message); }
    );
  });

  // --- Plataforma ---
  const plataformas = [
    ['Udemy', 'https://udemy.com', 'E-learning'],
    ['Coursera', 'https://coursera.org', 'E-learning'],
    ['edX', 'https://edx.org', 'E-learning']
  ];

  plataformas.forEach(params => {
    db.run(
      `INSERT INTO plataforma (nome, url, tipo)
       VALUES (?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Plataforma seed:', err.message); }
    );
  });

  // --- Curso ---
  const cursos = [
    ['Curso Node.js', 1, '20h', 50],
    ['Curso Python Avançado', 2, '30h', 70],
    ['Curso SQL Básico', 3, '15h', 100]
  ];

  cursos.forEach(params => {
    db.run(
      `INSERT INTO curso (nome, plataforma_id, carga_horaria, progresso)
       VALUES (?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Curso seed:', err.message); }
    );
  });

  // --- Investimento ---
  const investimentos = [
  [1, 'Renda Fixa', 'Investimento Inicial', 10000, 500, '2025-10-24'],
  [2, 'Ações', 'Compra de ações', 20000, 2000, '2025-10-25'],
  [3, 'Fundo Imobiliário', 'Investimento FIIs', 15000, 1000, '2025-10-26']
  ];

  investimentos.forEach(params => {
    db.run(
      `INSERT INTO investimento (contrato_id, tipo, descricao, valor_aplicado, rendimento, data_aplicacao)
      VALUES (?, ?, ?, ?, ?, ?)`,
      params,
      (err) => { if (err) console.error('❌ Investimento seed:', err.message); }
    );
  });

  console.log('✅ Todos os dados seed inseridos com sucesso!');
});

// Fecha conexão
db.close((err) => {
  if (err) console.error('❌ Erro ao fechar banco após seed:', err.message);
  else console.log('✅ Conexão do banco fechada após seed.');
});
