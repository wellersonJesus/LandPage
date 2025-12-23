<?php
/**
 * seed-db.php
 * Insere dados iniciais no banco (todas as tabelas)
 */

require_once __DIR__ . '/dbConnection.php';
$db = getDB();

// Helper para debug
function logMsg($msg) { echo "✔ $msg\n"; }

// =========================
//  USUÁRIO
// =========================
$usuarios = [
    ['Administrador', 'admin@ws.com', password_hash('admin123', PASSWORD_DEFAULT), 'admin'],
    ['Usuário Padrão', 'user@ws.com', password_hash('user123', PASSWORD_DEFAULT), 'user'],
    ['Gerente', 'gerente@ws.com', password_hash('gerente123', PASSWORD_DEFAULT), 'manager']
];

foreach ($usuarios as $u) {
    $stmt = $db->prepare("INSERT INTO usuario (nome, email, senha, role) VALUES (?, ?, ?, ?)");
    $stmt->execute($u);
}
logMsg("Usuários inseridos");

// =========================
//  EMPRESA
// =========================
$empresas = [
    ['WS Manager Ltda', 'Gerenciando o futuro', 'Sistema completo de gestão', '12.345.678/0001-91', 'Tecnologia', 'Brasil', 'Organizar processos', 'Sistemas Web', 'WS Platform'],
    ['Alpha Tech', 'Inovação sem limites', 'Consultoria e serviços', '98.765.432/0001-22', 'TI', 'São Paulo', 'Criar soluções inteligentes', 'Consultoria', 'Alpha Cloud'],
    ['Beta Corp', 'Excelência em resultados', 'Gestão empresarial', '22.333.444/0001-55', 'Serviços', 'Rio de Janeiro', 'Automatizar processos', 'Gestão', 'Beta CRM']
];

foreach ($empresas as $e) {
    $stmt = $db->prepare("
        INSERT INTO empresa (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($e);
}
logMsg("Empresas inseridas");

// =========================
//  GESTAO
// =========================
$gestoes = [
    ['2025-01-10', 120, 150, '08h', 2000, 500, 1500, 1],
    ['2025-01-11', 80, 100, '06h', 1500, 200, 1300, 1],
    ['2025-01-12', 160, 180, '09h', 3000, 800, 2200, 1]
];

foreach ($gestoes as $g) {
    $stmt = $db->prepare("
        INSERT INTO gestao (data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($g);
}
logMsg("Gestão inserida");

// =========================
//  CALENDARIO
// =========================
$calendario = [
    ['2025-01-01', 'Quarta', 1, 2025, 1],
    ['2025-01-02', 'Quinta', 1, 2025, 0],
    ['2025-01-03', 'Sexta', 1, 2025, 0]
];

foreach ($calendario as $c) {
    $stmt = $db->prepare("
        INSERT INTO calendario (data, dia_semana, mes, ano, feriado)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute($c);
}
logMsg("Calendário inserido");

// =========================
//  EMPRESTIMO
// =========================
$emprestimos = [
    ['12.345.678/0001-91', 'Empréstimo Banco A', 5000, 2000, 3000, '2025-02-10', '1/5', 1000],
    ['98.765.432/0001-22', 'Empréstimo Banco B', 8000, 3000, 5000, '2025-03-15', '1/8', 1000],
    ['22.333.444/0001-55', 'Investimento externo', 15000, 5000, 10000, '2025-04-20', '1/12', 1250]
];

foreach ($emprestimos as $e) {
    $stmt = $db->prepare("
        INSERT INTO emprestimo (cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($e);
}
logMsg("Empréstimos inseridos");

// =========================
//  LANCAMENTO
// =========================
$lancamentos = [
    [2025, 1, 'Compra de material', 200, 'Despesa'],
    [2025, 1, 'Venda de produto', 1500, 'Receita'],
    [2025, 1, 'Assinatura software', 90, 'Despesa']
];

foreach ($lancamentos as $l) {
    $stmt = $db->prepare("
        INSERT INTO lancamento (ano, mes, descricao, valor, categoria)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute($l);
}
logMsg("Lançamentos inseridos");

// =========================
//  MANUTENCAO
// =========================
$manutencao = [
    ['Troca de óleo', '2025-01-01', 150, '2025-03-01'],
    ['Revisão geral', '2025-02-10', 500, '2025-06-10'],
    ['Troca de pneus', '2025-01-20', 800, '2026-01-20']
];

foreach ($manutencao as $m) {
    $stmt = $db->prepare("
        INSERT INTO manutencao (tipo_manutencao, data_ultima, valor_pago, data_proxima)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute($m);
}
logMsg("Manutenções inseridas");

// =========================
//  CONTA
// =========================
$contas = [
    ['Wellerson', 'Corrente', '001-ABC'],
    ['WS Manager', 'PJ', 'CNPJ-8899'],
    ['Investimentos', 'Poupança', '789-XYZ']
];

foreach ($contas as $c) {
    $stmt = $db->prepare("INSERT INTO conta (titular, tipo_conta, identificador) VALUES (?, ?, ?)");
    $stmt->execute($c);
}
logMsg("Contas inseridas");

// =========================
//  SERVIDOR
// =========================
$servidores = [
    ['AWS', 'aws@server.com', 'root', '123', 'token1', 'Acesso AWS'],
    ['Google Cloud', 'gcp@server.com', 'admin', '456', 'token2', 'Acesso GCP'],
    ['Azure', 'azure@server.com', 'master', '789', 'token3', 'Acesso Azure']
];

foreach ($servidores as $s) {
    $stmt = $db->prepare("
        INSERT INTO servidor (servico, email, usuario, senha, tokens, frase)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($s);
}
logMsg("Servidores inseridos");

// =========================
//  DISPOSITIVO
// =========================
$disps = [
    ['Notebook', 'nb@ws.com', 'user1', '123', 't1'],
    ['Celular', 'cel@ws.com', 'user2', '456', 't2'],
    ['Tablet', 'tab@ws.com', 'user3', '789', 't3']
];

foreach ($disps as $d) {
    $stmt = $db->prepare("
        INSERT INTO dispositivo (dispositivo, email, usuario, senha, tokens)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute($d);
}
logMsg("Dispositivos inseridos");

// =========================
//  REDE
// =========================
$redes = [
    ['WiFi', 'Rede corporativa', 'wifi@ws.com', 'admin', '1234', 'tA'],
    ['VPN', 'Acesso remoto', 'vpn@ws.com', 'vpnroot', '5678', 'tB'],
    ['Lan', 'Interna', 'lan@ws.com', 'lanusr', '9999', 'tC']
];

foreach ($redes as $r) {
    $stmt = $db->prepare("
        INSERT INTO rede (categoria, descricao, email, usuario, senha, tokens)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($r);
}
logMsg("Redes inseridas");

// =========================
//  CONTRATO
// =========================
$contratos = [
    ['Prestação de Serviço', '2025-01-01', '2025-12-31', '12 meses', 'Contrato anual', 'R$ 10.000', 'iPhone', 'TIM', 'contato1@ws.com', '9999-9999', 'login1', 'Banco A', 'PIX1', 'Mensal', 'Sim', 'Ativo'],
    ['Consultoria', '2025-02-01', '2025-08-01', '6 meses', 'Consultoria TI', 'R$ 5.000', 'Samsung', 'Claro', 'contato2@ws.com', '8888-8888', 'login2', 'Banco B', 'PIX2', 'Mensal', 'Não', 'Ativo'],
    ['Parceria', '2025-03-10', '2025-09-10', '6 meses', 'Parceria empresarial', 'R$ 15.000', 'Xiaomi', 'Vivo', 'contato3@ws.com', '7777-7777', 'login3', 'Banco C', 'PIX3', 'Anual', 'Sim', 'Ativo']
];

foreach ($contratos as $c) {
    $stmt = $db->prepare("
        INSERT INTO contrato
        (tipo_contrato, data_inicio, data_vigencia, duracao, descricao, remuneracao, aparelho, chip, email_contato, telefone_contato, login, banco, pix, recebimentos, mei, gestao_financeira, parceria_empresarial)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($c);
}
logMsg("Contratos inseridos");

// =========================
//  SKILLS
// =========================
$skills = [
    ['PHP', 'Backend', 'Avançado'],
    ['JavaScript', 'Frontend', 'Intermediário'],
    ['SQL', 'Banco de Dados', 'Avançado']
];

foreach ($skills as $s) {
    $stmt = $db->prepare("INSERT INTO skill (nome, categoria, nivel) VALUES (?, ?, ?)");
    $stmt->execute($s);
}
logMsg("Skills inseridas");

// =========================
//  CURSO
// =========================
$cursos = [
    ['Laravel Master', 'laravel@ws.com', 'aluno1', '123', 'TK1'],
    ['React Pro', 'react@ws.com', 'aluno2', '456', 'TK2'],
    ['DevOps', 'devops@ws.com', 'aluno3', '789', 'TK3']
];

foreach ($cursos as $c) {
    $stmt = $db->prepare("
        INSERT INTO curso (nome, email, usuario, senha, tokens)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute($c);
}
logMsg("Cursos inseridos");

// =========================
//  PLATAFORMA
// =========================
$plataformas = [
    ['YouTube', 'yt@ws.com', 'ytuser', '123', 'TkY'],
    ['Google', 'gg@ws.com', 'gguser', '456', 'TkG'],
    ['AWS', 'aws@ws.com', 'awsroot', '789', 'TkA']
];

foreach ($plataformas as $p) {
    $stmt = $db->prepare("
        INSERT INTO plataforma (nome, email, usuario, senha, tokens)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute($p);
}
logMsg("Plataformas inseridas");

// =========================
//  INVESTIMENTO
// =========================
$invest = [
    ['Renda Fixa', 'Tesouro Selic', 2000, 2100, '2024-01-01', '2026-01-01'],
    ['Ações', 'PETR4', 5000, 5200, '2024-06-01', '2027-06-01'],
    ['Cripto', 'Bitcoin', 3000, 4500, '2023-10-01', '2030-10-01']
];

foreach ($invest as $i) {
    $stmt = $db->prepare("
        INSERT INTO investimento (tipo, descricao, valor_investido, valor_atual, data_inicio, data_vencimento)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute($i);
}
logMsg("Investimentos inseridos");


echo "\n🎉 SEED COMPLETA FINALIZADA COM SUCESSO!\n";
