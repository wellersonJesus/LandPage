<?php

$autoloadPath = __DIR__ . '/../../vendor/autoload.php';

if (!file_exists($autoloadPath)) {
    die("Erro: Dependências não instaladas. Execute 'cd api && composer install' no terminal.\n");
}

require $autoloadPath;

use App\Database\Database;
use Dotenv\Dotenv;

// Carrega variáveis de ambiente
if (file_exists(__DIR__ . '/../../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->safeLoad();
} elseif (file_exists(__DIR__ . '/../../../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../../');
    $dotenv->safeLoad();
}

try {
    $pdo = Database::getConnection();

    // --- 1. USUARIO (Admin + Users) ---
    $adminName = $_ENV['ADMIN_NAME'] ?? 'Admin System';
    $adminEmail = $_ENV['ADMIN_EMAIL'] ?? 'admin@landpage.com';
    $adminPassword = $_ENV['ADMIN_PASSWORD'] ?? '123';
    $passwordHash = password_hash($adminPassword, PASSWORD_DEFAULT);
    $createdAt = date('Y-m-d H:i:s');

    // Admin
    $sql = "INSERT OR IGNORE INTO USUARIO (nome, email, senha, role, created_at) VALUES (:nome, :email, :senha, 'admin', :created_at)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome' => $adminName,
        ':email' => $adminEmail,
        ':senha' => $passwordHash,
        ':created_at' => $createdAt
    ]);

    // Outros Usuários
    $users = [
        ['User Operacional', 'operacional@landpage.com', 'user'],
        ['User Financeiro', 'financeiro@landpage.com', 'financeiro'],
        ['User Gestor', 'gestor@landpage.com', 'gestor']
    ];
    foreach ($users as $u) {
        $stmt->execute([
            ':nome' => $u[0],
            ':email' => $u[1],
            ':senha' => password_hash('123', PASSWORD_DEFAULT),
            ':created_at' => date('Y-m-d H:i:s')
        ]);
    }

    // --- 2. EMPRESA ---
    $empresas = [
        ['Tech Solutions', 'Inovação sempre', 'Empresa de TI', '12.345.678/0001-90', 'Desenvolvimento', 'São Paulo', 'Transformar o mundo', 'DevOps, Cloud', 'Projeto Alpha'],
        ['Agro Business', 'O campo não para', 'Agronegócio', '98.765.432/0001-10', 'Agricultura', 'Mato Grosso', 'Alimentar o mundo', 'Consultoria', 'Safra 2024'],
        ['Educa Mais', 'Ensino de qualidade', 'Educação', '11.222.333/0001-44', 'Ensino EAD', 'Rio de Janeiro', 'Educar para o futuro', 'Cursos Online', 'Plataforma EAD']
    ];
    $sqlEmpresa = "INSERT INTO EMPRESA (nome, slogan, descricao, cnpj, atividade, localizacao, missao, servicos, projetos_destaque) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtEmpresa = $pdo->prepare($sqlEmpresa);
    foreach ($empresas as $emp) {
        $stmtEmpresa->execute($emp);
    }

    // --- 3. SERVIDOR ---
    $servidores = [
        ['AWS EC2', 'aws@admin.com', 'admin_aws', 'pass_aws', 'token_aws', 'frase_seguranca_1'],
        ['DigitalOcean Droplet', 'do@admin.com', 'admin_do', 'pass_do', 'token_do', 'frase_seguranca_2'],
        ['Google Cloud VM', 'gcp@admin.com', 'admin_gcp', 'pass_gcp', 'token_gcp', 'frase_seguranca_3']
    ];
    $sqlServidor = "INSERT INTO SERVIDOR (servico, email, usuario, senha, tokens, frase) VALUES (?, ?, ?, ?, ?, ?)";
    $stmtServidor = $pdo->prepare($sqlServidor);
    foreach ($servidores as $srv) {
        $stmtServidor->execute($srv);
    }

    // --- 4. GESTAO ---
    $gestoes = [
        ['2023-10-01', 150.5, 500.0, '08:00', 1000.00, 200.00, 800.00, 5000.00],
        ['2023-10-02', 120.0, 500.0, '07:30', 800.00, 150.00, 650.00, 5650.00],
        ['2023-10-03', 180.0, 500.0, '09:00', 1200.00, 300.00, 900.00, 6550.00]
    ];
    $sqlGestao = "INSERT INTO GESTAO (data, km_percorrido, meta, horas_trabalhadas, receita, despesa, lucro, conta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtGestao = $pdo->prepare($sqlGestao);
    foreach ($gestoes as $gst) {
        $stmtGestao->execute($gst);
    }

    // --- 5. DISPOSITIVO ---
    $dispositivos = [
        ['iPhone 13', 'dev1@test.com', 'user_dev1', 'pass1', 'tok1'],
        ['Samsung S22', 'dev2@test.com', 'user_dev2', 'pass2', 'tok2'],
        ['MacBook Pro', 'dev3@test.com', 'user_dev3', 'pass3', 'tok3']
    ];
    $sqlDisp = "INSERT INTO DISPOSITIVO (dispositivo, email, usuario, senha, tokens) VALUES (?, ?, ?, ?, ?)";
    $stmtDisp = $pdo->prepare($sqlDisp);
    foreach ($dispositivos as $dsp) {
        $stmtDisp->execute($dsp);
    }

    // --- 6. CALENDARIO ---
    $calendarios = [
        ['2023-12-25', 'Segunda', 12, 2023, 1],
        ['2024-01-01', 'Segunda', 1, 2024, 1],
        ['2024-02-15', 'Quinta', 2, 2024, 0]
    ];
    $sqlCal = "INSERT INTO CALENDARIO (data, dia_semana, mes, ano, feriado) VALUES (?, ?, ?, ?, ?)";
    $stmtCal = $pdo->prepare($sqlCal);
    foreach ($calendarios as $cal) {
        $stmtCal->execute($cal);
    }

    // --- 7. EMPRESTIMO ---
    $emprestimos = [
        ['12345678000199', 'Empréstimo Expansão', 50000.00, 10000.00, 40000.00, '2023-11-10', '1/10', 5000.00],
        ['98765432000188', 'Capital de Giro', 20000.00, 5000.00, 15000.00, '2023-11-15', '2/12', 1800.00],
        ['11223344000177', 'Compra Equipamento', 15000.00, 0.00, 15000.00, '2023-12-01', '0/10', 1500.00]
    ];
    $sqlEmp = "INSERT INTO EMPRESTIMO (cnpj, descricao, valor_total, valor_pago, valor_a_pagar, data_parcela, numero_parcela, valor_parcela) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtEmp = $pdo->prepare($sqlEmp);
    foreach ($emprestimos as $emp) {
        $stmtEmp->execute($emp);
    }

    // --- 8. MANUTENCAO ---
    $manutencoes = [
        ['Troca de Óleo', '2023-09-01', 250.00, '2024-03-01'],
        ['Revisão Freios', '2023-08-15', 400.00, '2024-02-15'],
        ['Alinhamento', '2023-10-01', 100.00, '2024-04-01']
    ];
    $sqlMan = "INSERT INTO MANUTENCAO (tipo_manutencao, data_ultima, valor_pago, data_proxima) VALUES (?, ?, ?, ?)";
    $stmtMan = $pdo->prepare($sqlMan);
    foreach ($manutencoes as $man) {
        $stmtMan->execute($man);
    }

    // --- 9. SKILL ---
    $skills = [
        ['PHP', 'Backend', 'Avançado'],
        ['Angular', 'Frontend', 'Intermediário'],
        ['Docker', 'DevOps', 'Básico']
    ];
    $sqlSkill = "INSERT INTO SKILL (nome, categoria, nivel) VALUES (?, ?, ?)";
    $stmtSkill = $pdo->prepare($sqlSkill);
    foreach ($skills as $skl) {
        $stmtSkill->execute($skl);
    }

    // --- 10. CURSO ---
    $cursos = [
        ['Curso Fullstack', 'aluno1@curso.com', 'aluno1', 'pass1', 'tok1'],
        ['Curso DevOps', 'aluno2@curso.com', 'aluno2', 'pass2', 'tok2'],
        ['Curso Mobile', 'aluno3@curso.com', 'aluno3', 'pass3', 'tok3']
    ];
    $sqlCurso = "INSERT INTO CURSO (nome, email, usuario, senha, tokens) VALUES (?, ?, ?, ?, ?)";
    $stmtCurso = $pdo->prepare($sqlCurso);
    foreach ($cursos as $cur) {
        $stmtCurso->execute($cur);
    }

    // --- 11. REDE ---
    $redes = [
        ['Social', 'Instagram', 'insta@empresa.com', 'user_insta', 'pass_insta', 'tok_insta'],
        ['Profissional', 'LinkedIn', 'linkedin@empresa.com', 'user_in', 'pass_in', 'tok_in'],
        ['Video', 'YouTube', 'yt@empresa.com', 'user_yt', 'pass_yt', 'tok_yt']
    ];
    $sqlRede = "INSERT INTO REDE (categoria, descricao, email, usuario, senha, tokens) VALUES (?, ?, ?, ?, ?, ?)";
    $stmtRede = $pdo->prepare($sqlRede);
    foreach ($redes as $rede) {
        $stmtRede->execute($rede);
    }

    // --- 12. PLATAFORMA (Depende de SERVIDOR) ---
    $plataformas = [
        [1, 'Plataforma Web', 'web@plat.com', 'admin_web', 'pass_web', 'tok_web'],
        [2, 'Plataforma Mobile', 'mob@plat.com', 'admin_mob', 'pass_mob', 'tok_mob'],
        [3, 'API Gateway', 'api@plat.com', 'admin_api', 'pass_api', 'tok_api']
    ];
    $sqlPlat = "INSERT INTO PLATAFORMA (servidor_id, nome, email, usuario, senha, tokens) VALUES (?, ?, ?, ?, ?, ?)";
    $stmtPlat = $pdo->prepare($sqlPlat);
    foreach ($plataformas as $plat) {
        $stmtPlat->execute($plat);
    }

    // --- 13. LANCAMENTO (Depende de GESTAO) ---
    $lancamentos = [
        [1, 2023, 10, 'Venda de Serviço', 1000.00, 'Receita'],
        [1, 2023, 10, 'Combustível', 200.00, 'Despesa'],
        [2, 2023, 10, 'Manutenção', 150.00, 'Despesa']
    ];
    $sqlLanc = "INSERT INTO LANCAMENTO (gestao_id, ano, mes, descricao, valor, categoria) VALUES (?, ?, ?, ?, ?, ?)";
    $stmtLanc = $pdo->prepare($sqlLanc);
    foreach ($lancamentos as $lanc) {
        $stmtLanc->execute($lanc);
    }

    // --- 14. CONTRATO (Depende de EMPRESA) ---
    $contratos = [
        [1, 'Prestação de Serviço', '2023-01-01', '2024-01-01', '12 meses', 'Desenvolvimento Web', '5000.00', 'iPhone', 'Vivo', 'contato@tech.com', '1199999999', 'login_tech', 'Nubank', 'pix_tech', 'Mensal', 'Sim', 'Sim', 'Sim'],
        [2, 'Consultoria', '2023-06-01', '2024-06-01', '12 meses', 'Consultoria Agrícola', '8000.00', 'Samsung', 'Claro', 'contato@agro.com', '6599999999', 'login_agro', 'Inter', 'pix_agro', 'Trimestral', 'Não', 'Sim', 'Não'],
        [3, 'Parceria', '2023-03-01', '2025-03-01', '24 meses', 'Parceria Educacional', '3000.00', 'Xiaomi', 'Tim', 'contato@educa.com', '2199999999', 'login_educa', 'Itau', 'pix_educa', 'Semestral', 'Sim', 'Não', 'Sim']
    ];
    $sqlContrato = "INSERT INTO CONTRATO (empresa_id, tipo_contrato, data_inicio, data_vigencia, duracao, descricao, remuneracao, aparelho, chip, email_contato, telefone_contato, login, banco, pix, recebimentos, mei, gestao_financeira, parceria_empresarial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmtContrato = $pdo->prepare($sqlContrato);
    foreach ($contratos as $ct) {
        $stmtContrato->execute($ct);
    }

    // --- 15. CONTA (Depende de CONTRATO e DISPOSITIVO) ---
    $contas = [
        [1, 1, 'João Silva', 'Corrente', '12345-6'],
        [2, 2, 'Maria Oliveira', 'Poupança', '65432-1'],
        [3, 3, 'Carlos Souza', 'PJ', '98765-0']
    ];
    $sqlConta = "INSERT INTO CONTA (contrato_id, dispositivo_id, titular, tipo_conta, identificador) VALUES (?, ?, ?, ?, ?)";
    $stmtConta = $pdo->prepare($sqlConta);
    foreach ($contas as $cnt) {
        $stmtConta->execute($cnt);
    }

    // --- 16. INVESTIMENTO (Depende de CONTRATO) ---
    $investimentos = [
        [1, 'CDB', 'Reserva de Emergência', 1000.00, 1100.00, '2023-01-01', '2025-01-01'],
        [2, 'Ações', 'Longo Prazo', 5000.00, 5200.00, '2023-06-01', '2030-01-01'],
        [3, 'FII', 'Renda Mensal', 3000.00, 3050.00, '2023-03-01', '2028-01-01']
    ];
    $sqlInv = "INSERT INTO INVESTIMENTO (contrato_id, tipo, descricao, valor_investido, valor_atual, data_inicio, data_vencimento) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmtInv = $pdo->prepare($sqlInv);
    foreach ($investimentos as $inv) {
        $stmtInv->execute($inv);
    }

    echo "Seeds executados com sucesso! Todas as tabelas foram populadas.\n";

} catch (Exception $e) {
    echo "Erro ao executar seeds: " . $e->getMessage() . "\n";
}