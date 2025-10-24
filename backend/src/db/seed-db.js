// backend/src/db/seed-db.js
import db from './dbConnection.js';

// Exemplo de seed para várias tabelas
db.serialize(() => {
  console.log('🚀 Inserindo dados iniciais...');

  // --- Empresa ---
  db.run(
    `INSERT INTO empresa (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['TechCorp', 'Inovação e Futuro', 'Empresa de tecnologia', '12.345.678/0001-90', 'TI', 'São Paulo', 'Transformar o mundo', 'Software, Consultoria', 'Projeto X'],
    (err) => { if (err) console.error('❌ Empresa seed:', err.message); }
  );

  // --- Conta ---
  db.run(
    `INSERT INTO conta (nome, banco, tipo, saldo, agencia, numero_conta)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['Conta Principal', 'Banco XYZ', 'Corrente', 100000.00, '1234', '56789-0'],
    (err) => { if (err) console.error('❌ Conta seed:', err.message); }
  );

  // --- Gestao ---
  db.run(
    `INSERT INTO gestao (data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['2025-10-24', 120, 1000, '8h', 5000, 2000, 3000, 1],
    (err) => { if (err) console.error('❌ Gestao seed:', err.message); }
  );

  // --- Calendario ---
  db.run(
    `INSERT INTO calendario (data, dia_semana, mes, ano, feriado)
     VALUES (?, ?, ?, ?, ?)`,
    ['2025-12-25', 'quinta', 12, 2025, 1],
    (err) => { if (err) console.error('❌ Calendario seed:', err.message); }
  );

  // --- Emprestimo ---
  db.run(
    `INSERT INTO emprestimo (cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['12.345.678/0001-90', 'Empréstimo inicial', 50000, 10000, 40000, '2025-11-01', '1/12', 4166.66],
    (err) => { if (err) console.error('❌ Emprestimo seed:', err.message); }
  );

  // --- Lancamento ---
  db.run(
    `INSERT INTO lancamento (data, descricao, tipo, valor, categoria, conta_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['2025-10-24', 'Venda Produto X', 'Receita', 2000, 'Vendas', 1],
    (err) => { if (err) console.error('❌ Lancamento seed:', err.message); }
  );

  // --- Manutencao ---
  db.run(
    `INSERT INTO manutencao (dispositivo_id, data, descricao, custo, status)
     VALUES (?, ?, ?, ?, ?)`,
    [1, '2025-10-20', 'Troca de HD', 500, 'Concluída'],
    (err) => { if (err) console.error('❌ Manutencao seed:', err.message); }
  );

  // --- Servidor ---
  db.run(
    `INSERT INTO servidor (nome, ip, sistema_operacional, status, localizacao)
     VALUES (?, ?, ?, ?, ?)`,
    ['Servidor Principal', '192.168.0.1', 'Ubuntu 22.04', 'Ativo', 'Data Center SP'],
    (err) => { if (err) console.error('❌ Servidor seed:', err.message); }
  );

  // --- Dispositivo ---
  db.run(
    `INSERT INTO dispositivo (nome, tipo, marca, modelo, numero_serie, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['Notebook Dev', 'Notebook', 'Dell', 'Inspiron 5423', 'SN123456', 'Ativo'],
    (err) => { if (err) console.error('❌ Dispositivo seed:', err.message); }
  );

  // --- Rede ---
  db.run(
    `INSERT INTO rede (nome, ip, mascara, gateway, dns, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['Rede Interna', '192.168.0.0', '255.255.255.0', '192.168.0.1', '8.8.8.8', 'Ativa'],
    (err) => { if (err) console.error('❌ Rede seed:', err.message); }
  );

  // --- Contrato ---
  db.run(
    `INSERT INTO contrato (empresa_id, descricao, valor, data_inicio, data_fim, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [1, 'Contrato de Suporte', 12000, '2025-01-01', '2025-12-31', 'Ativo'],
    (err) => { if (err) console.error('❌ Contrato seed:', err.message); }
  );

  // --- Skill ---
  db.run(
    `INSERT INTO skill (nome, nivel, categoria)
     VALUES (?, ?, ?)`,
    ['JavaScript', 'Avançado', 'Programação'],
    (err) => { if (err) console.error('❌ Skill seed:', err.message); }
  );

  // --- Plataforma ---
  db.run(
    `INSERT INTO plataforma (nome, url, tipo)
     VALUES (?, ?, ?)`,
    ['Udemy', 'https://udemy.com', 'E-learning'],
    (err) => { if (err) console.error('❌ Plataforma seed:', err.message); }
  );

  // --- Curso ---
  db.run(
    `INSERT INTO curso (nome, plataforma_id, carga_horaria, progresso)
     VALUES (?, ?, ?, ?)`,
    ['Curso Node.js', 1, '20h', 50],
    (err) => { if (err) console.error('❌ Curso seed:', err.message); }
  );

  // --- Investimento ---
  db.run(
    `INSERT INTO investimento (tipo, descricao, valor_aplicado, rendimento, data_aplicacao)
     VALUES (?, ?, ?, ?, ?)`,
    ['Renda Fixa', 'Investimento Inicial', 10000, 500, '2025-10-24'],
    (err) => { if (err) console.error('❌ Investimento seed:', err.message); }
  );

  console.log('✅ Todos os dados seed inseridos com sucesso!');
});

// Fecha conexão
db.close((err) => {
  if (err) console.error('❌ Erro ao fechar banco após seed:', err.message);
  else console.log('✅ Conexão do banco fechada após seed.');
});
