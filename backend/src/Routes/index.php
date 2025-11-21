<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

// Importa cada arquivo de rotas
use App\Routes\UsuarioRoutes;
use App\Routes\EmpresaRoutes;
use App\Routes\GestaoRoutes;
use App\Routes\CalendarioRoutes;
use App\Routes\EmprestimoRoutes;
use App\Routes\LancamentoRoutes;
use App\Routes\ManutencaoRoutes;
use App\Routes\ContaRoutes;
use App\Routes\ServidorRoutes;
use App\Routes\DispositivoRoutes;
use App\Routes\RedeRoutes;
use App\Routes\ContratoRoutes;
use App\Routes\SkillRoutes;
use App\Routes\CursoRoutes;
use App\Routes\PlataformaRoutes;
use App\Routes\InvestimentoRoutes;

return function (App $app) {

    // -------------------------------
    // ROTA RAIZ DA API
    // -------------------------------
    $app->get('/', function ($request, $response) {
        $data = [
            'message' => 'API WS-Manager rodando',
            'endpoints' => [
                '/usuarios', '/empresa', '/gestao', '/calendario', '/emprestimo',
                '/lancamento', '/manutencao', '/conta', '/servidor', 
                '/dispositivo', '/rede', '/contrato', '/skill', 
                '/curso', '/plataforma', '/investimento'
            ]
        ];

        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // -------------------------------
    // HEALTH CHECK
    // -------------------------------
    $app->get('/health', function ($request, $response) {
        $response->getBody()->write(json_encode(['status' => 'ok']));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // -------------------------------
    // AGRUPAMENTO DE ROTAS
    // -------------------------------
    $app->group('/usuarios', UsuarioRoutes::class);
    $app->group('/empresa', EmpresaRoutes::class);
    $app->group('/gestao', GestaoRoutes::class);
    $app->group('/calendario', CalendarioRoutes::class);
    $app->group('/emprestimo', EmprestimoRoutes::class);
    $app->group('/lancamento', LancamentoRoutes::class);
    $app->group('/manutencao', ManutencaoRoutes::class);
    $app->group('/conta', ContaRoutes::class);
    $app->group('/servidor', ServidorRoutes::class);
    $app->group('/dispositivo', DispositivoRoutes::class);
    $app->group('/rede', RedeRoutes::class);
    $app->group('/contrato', ContratoRoutes::class);
    $app->group('/skill', SkillRoutes::class);
    $app->group('/curso', CursoRoutes::class);
    $app->group('/plataforma', PlataformaRoutes::class);
    $app->group('/investimento', InvestimentoRoutes::class);
};
