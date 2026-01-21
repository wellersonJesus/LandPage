<?php

// Rota de Login (Pública)
$router->add('POST', '/api/login', 'App\Auth\AuthController', 'login');

// Define os recursos da API
// Sintaxe: 'caminho' => ['Controller', ['roles_permitidas']]
// Se roles estiver vazio [], apenas autenticação é exigida.
$resources = [
    '/api/usuarios'      => ['UsuarioController', ['infra_admin', 'admin']], // Apenas Admins criam users
    '/api/empresas'      => ['EmpresaController', []], // Autenticado
    '/api/servidores'    => ['ServidorController', ['infra_admin']], // Apenas Infra Admin
    '/api/gestao'        => ['GestaoController', ['gestor', 'financeiro']],
    '/api/dispositivos'  => ['DispositivoController', []],
    '/api/calendario'    => ['CalendarioController', []],
    '/api/emprestimos'   => ['EmprestimoController', ['financeiro']],
    '/api/manutencao'    => ['ManutencaoController', []],
    '/api/skills'        => ['SkillController', []],
    '/api/cursos'        => ['CursoController', []],
    '/api/redes'         => ['RedeController', []],
    '/api/plataformas'   => ['PlataformaController', ['infra_admin', 'admin']],
    '/api/lancamentos'   => ['LancamentoController', ['financeiro', 'gestor']],
    '/api/contratos'     => ['ContratoController', ['admin', 'gestor']],
    '/api/contas'        => ['ContaController', ['financeiro']],
    '/api/investimentos' => ['InvestimentoController', ['financeiro']],
];

foreach ($resources as $path => $config) {
    $controller = $config[0];
    $roles = $config[1];
    // Passa as roles para o middleware
    $router->resource($path, $controller, ['roles' => $roles]);
}