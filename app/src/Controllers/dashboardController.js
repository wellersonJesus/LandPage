/**
 * Controller responsável pela lógica da Dashboard
 */

import { API_URL } from '../Services/api.js';
import { administracaoController } from './administracaoController.js';
import { financeiroController } from './financeiroController.js';
import { skillsController } from './skillsController.js';
import { GenericTabs } from '../Components/Tabs/GenericTabs.js';

// Definição dos Módulos e Permissões
const MODULES = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: 'bi-speedometer2', roles: ['*'] },
    { id: 'financeiro', label: 'Gestão', icon: 'bi-cash-coin', roles: ['infra_admin', 'financeiro'] },
    { id: 'institucional', label: 'Institucional & Contratos', icon: 'bi bi-journals', roles: ['infra_admin', 'admin', 'gestor'] },
    { id: 'operacional', label: 'Operacional & Ativos', icon: 'bi-hdd-network', roles: ['infra_admin', 'admin'] },
    { id: 'planejamento', label: 'Planejamento', icon: 'bi-calendar-event', roles: ['infra_admin', 'gestor'] },
    { id: 'skills', label: 'Skills & Carreira', icon: 'bi-mortarboard', roles: ['infra_admin', 'gestor'] },
    { id: 'admin', label: 'Administração', icon: 'bi-shield-lock', roles: ['infra_admin'] }
];

export const dashboardController = {
    init: () => {
        console.log('Dashboard Controller Initialized');
        displayUserInfo();
        renderSidebar();
        loadModule('dashboard'); // Carrega o módulo padrão
    }
};

function displayUserInfo() {
    // Recupera o campo 'nome' da tabela USUARIO salvo no login
    const nome = localStorage.getItem('nome');
    const userNameDisplay = document.getElementById('user-name-display');
    
    if (userNameDisplay) {
        // Exibe o nome do usuário ou 'Usuário' como padrão se estiver vazio
        userNameDisplay.textContent = nome ? nome : 'Usuário';
    }
}

function renderSidebar() {
    const userRole = localStorage.getItem('role');
    const sidebarContainer = document.getElementById('sidebar-nav-items');
    const mobileContainer = document.getElementById('mobile-nav-items');
    const mobileGrid = document.getElementById('mobile-menu-grid');

    if (sidebarContainer) sidebarContainer.innerHTML = '';
    if (mobileContainer) mobileContainer.innerHTML = '';
    if (mobileGrid) mobileGrid.innerHTML = '';

    // Botão de alternância (Toggle) no topo da sidebar para Desktop
    const liToggle = document.createElement('li');
    liToggle.className = 'nav-item mb-2 d-none d-md-block border-bottom pb-2';
    liToggle.innerHTML = `
        <a class="nav-link" href="#" onclick="toggleSidebar()" id="sidebar-toggle-link" title="Expandir/Recolher">
            <i class="bi bi-list me-2"></i>
            <span>Menu</span>
        </a>
    `;
    if (sidebarContainer) sidebarContainer.appendChild(liToggle);

    let mobileCount = 0;
    const maxMobileItems = 3; // Exibe 3 módulos + botão "Mais"

    MODULES.forEach(module => {
        // Verifica permissões:
        // 1. Módulo público (*)
        // 2. Role do usuário está na lista do módulo
        // 3. Usuário é infra_admin ou admin (acesso total)
        const hasAccess = module.roles.includes('*') || (userRole && module.roles.includes(userRole)) || userRole === 'infra_admin' || userRole === 'admin';

        if (hasAccess) {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `
                <a class="nav-link" href="#" onclick="window.loadModule('${module.id}', this)">
                    <i class="bi ${module.icon} me-2"></i>
                    <span>${module.label}</span>
                </a>
            `;
            if (sidebarContainer) sidebarContainer.appendChild(li);

            // Mobile Bottom Nav (Apenas os primeiros)
            if (mobileContainer && mobileCount < maxMobileItems) {
                const liMobile = document.createElement('li');
                liMobile.className = 'nav-item';
                liMobile.innerHTML = `
                    <a class="nav-link d-flex flex-column align-items-center text-muted px-3" href="#" onclick="window.loadModule('${module.id}', this)" id="mobile-link-${module.id}">
                        <i class="bi ${module.icon} fs-4"></i>
                        <span style="font-size: 10px;">${module.label.split(' ')[0]}</span>
                    </a>
                `;
                mobileContainer.appendChild(liMobile);
                mobileCount++;
            }

            // Mobile Offcanvas Grid (Todos os módulos)
            if (mobileGrid) {
                const col = document.createElement('div');
                col.className = 'col-4 text-center';
                col.innerHTML = `
                    <div class="p-3 border rounded-3 bg-white shadow-sm h-100 d-flex flex-column align-items-center justify-content-center" 
                         onclick="window.loadModule('${module.id}', null); const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenuOffcanvas')); if(bsOffcanvas) bsOffcanvas.hide();"
                         style="cursor: pointer;">
                        <i class="bi ${module.icon} fs-1 text-primary"></i>
                    </div>
                `;
                mobileGrid.appendChild(col);
            }
        }
    });

    // Adiciona botão Sair na Sidebar (Desktop)
    const liLogout = document.createElement('li');
    liLogout.className = 'nav-item mt-3 border-top pt-2';
    liLogout.innerHTML = `
        <a class="nav-link text-danger" href="#" onclick="logout()">
            <i class="bi bi-box-arrow-right me-2"></i>
            <span>Sair</span>
        </a>
    `;
    if (sidebarContainer) sidebarContainer.appendChild(liLogout);

    // Botão "Mais" na Barra Inferior (Mobile)
    if (mobileContainer) {
        const liMore = document.createElement('li');
        liMore.className = 'nav-item';
        liMore.innerHTML = `
            <a class="nav-link d-flex flex-column align-items-center text-muted px-3" href="#" data-bs-toggle="offcanvas" data-bs-target="#mobileMenuOffcanvas">
                <i class="bi bi-grid-3x3-gap-fill fs-4"></i>
                <span style="font-size: 10px;">Mais</span>
            </a>
        `;
        mobileContainer.appendChild(liMore);
    }

    // Mobile Offcanvas Logout (Adicionado à grade)
    if (mobileGrid) {
        const col = document.createElement('div');
        col.className = 'col-4 text-center';
        col.innerHTML = `
            <div class="p-3 border rounded-3 bg-white shadow-sm h-100 d-flex flex-column align-items-center justify-content-center" 
                 onclick="logout()"
                 style="cursor: pointer;">
                <i class="bi bi-box-arrow-right fs-1 text-danger"></i>
            </div>
        `;
        mobileGrid.appendChild(col);
    }
}

window.toggleSidebar = () => {
    const sidebar = document.getElementById('sidebarMenu');
    const main = document.querySelector('main');
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded');
}

// Função global para ser chamada pelo onclick
window.loadModule = (moduleId, element) => {
    // Atualiza classe active
    if (element) {
        // Remove active de todos os links (sidebar e mobile)
        document.querySelectorAll('.sidebar .nav-link, #mobile-nav-items .nav-link').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    } else {
        // Se não passou elemento (init), ativa o primeiro correspondente
        const firstLink = document.querySelector(`.sidebar .nav-link[onclick*="${moduleId}"]`);
        if (firstLink) firstLink.classList.add('active');
        // Ativa também no mobile
        const mobileLink = document.querySelector(`#mobile-nav-items .nav-link[onclick*="${moduleId}"]`);
        if (mobileLink) mobileLink.classList.add('active');
    }

    // Atualiza o ícone e texto do botão de toggle (Menu) conforme o módulo selecionado
    const selectedModule = MODULES.find(m => m.id === moduleId);
    const toggleLink = document.getElementById('sidebar-toggle-link');
    if (selectedModule && toggleLink) {
        const icon = toggleLink.querySelector('i');
        const span = toggleLink.querySelector('span');
        if (icon) icon.className = `bi ${selectedModule.icon} me-2`;
        if (span) span.textContent = selectedModule.label;
    }

    const contentDiv = document.getElementById('main-content');
    if (!contentDiv) return;
    
    switch(moduleId) {
        case 'dashboard':
            renderDashboardCharts(contentDiv);
            break;
        case 'financeiro':
            financeiroController.render(contentDiv);
            break;
        case 'institucional':
            renderInstitucionalModule(contentDiv);
            break;
        case 'operacional':
            GenericTabs.render(contentDiv, 'Operacional & Ativos', ['Servidores', 'Dispositivos', 'Plataformas', 'Redes', 'Manutenção']);
            break;
        case 'planejamento':
            GenericTabs.render(contentDiv, 'Planejamento', ['Calendário', 'Eventos']);
            break;
        case 'skills':
            skillsController.render(contentDiv);
            break;
        case 'admin':
            administracaoController.render(contentDiv);
            break;
        default:
            contentDiv.innerHTML = '<h2>Módulo não encontrado</h2>';
    }
};

function renderDashboardCharts(container) {
    container.innerHTML = `
        <!-- Topo: KPIs (Indicadores Rápidos) -->
        <div class="row mb-4 g-3">
            <div class="col-md-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h6 class="text-muted text-uppercase small fw-bold mb-2">Financeiro</h6>
                            <h3 class="fw-bold text-success mb-0">R$ 15.200</h3>
                        </div>
                        <small class="text-muted mt-2"><i class="bi bi-arrow-up-right text-success"></i> Lucro este mês</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h6 class="text-muted text-uppercase small fw-bold mb-2">Operacional</h6>
                            <h3 class="fw-bold text-primary mb-0">12/15</h3>
                        </div>
                        <small class="text-muted mt-2"><i class="bi bi-hdd-network"></i> Ativos Online</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h6 class="text-muted text-uppercase small fw-bold mb-2">Contratos</h6>
                            <h3 class="fw-bold text-info mb-0">8 Ativos</h3>
                        </div>
                        <small class="text-muted mt-2"><i class="bi bi-exclamation-circle text-warning"></i> 2 vencendo em breve</small>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h6 class="text-muted text-uppercase small fw-bold mb-2">Performance</h6>
                            <h3 class="fw-bold text-warning mb-0">85%</h3>
                        </div>
                        <small class="text-muted mt-2"><i class="bi bi-speedometer2"></i> Meta de KM atingida</small>
                    </div>
                </div>
            </div>
        </div>

        <!-- Meio: Gráficos de Tendência -->
        <div class="row mb-4 g-3">
            <div class="col-lg-8">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-0 fw-bold py-3">Evolução Financeira (6 Meses)</div>
                    <div class="card-body">
                        <canvas id="financeLineChart" style="max-height: 300px;"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-0 fw-bold py-3">Horas Trabalhadas (Semana)</div>
                    <div class="card-body">
                        <canvas id="hoursBarChart" style="max-height: 300px;"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Baixo: Listas de Ação Rápida -->
        <div class="row g-3">
            <div class="col-md-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-0 fw-bold py-3">Próximos Eventos</div>
                    <ul class="list-group list-group-flush small">
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-calendar-event me-2 text-primary"></i>Reunião Geral</span>
                            <span class="badge bg-light text-dark">Hoje</span>
                        </li>
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-flag me-2 text-success"></i>Feriado Nacional</span>
                            <span class="badge bg-light text-dark">15/11</span>
                        </li>
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-people me-2 text-info"></i>Treinamento</span>
                            <span class="badge bg-light text-dark">20/11</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-0 fw-bold py-3">Alertas de Manutenção</div>
                    <ul class="list-group list-group-flush small">
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-server me-2 text-muted"></i>Servidor AWS-01</span>
                            <span class="badge bg-warning text-dark">Preventiva</span>
                        </li>
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-laptop me-2 text-muted"></i>Notebook Dell</span>
                            <span class="badge bg-danger">Corretiva</span>
                        </li>
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-router me-2 text-muted"></i>Router Principal</span>
                            <span class="badge bg-info">Config</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-0 fw-bold py-3">Parcelas a Vencer</div>
                    <ul class="list-group list-group-flush small">
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span>Empréstimo BB</span>
                            <span class="text-danger fw-bold">R$ 1.200</span>
                        </li>
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span>Financiamento Veículo</span>
                            <span class="text-danger fw-bold">R$ 850</span>
                        </li>
                        <li class="list-group-item border-0 px-4 py-2 d-flex justify-content-between align-items-center">
                            <span>Seguro Empresarial</span>
                            <span class="text-danger fw-bold">R$ 400</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Renderiza Gráficos com Chart.js (Simulação)
    if (typeof Chart !== 'undefined') {
        // Gráfico de Linha: Receita vs Despesa
        new Chart(document.getElementById('financeLineChart'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Receita',
                        data: [12000, 15000, 14000, 18000, 22000, 25000],
                        borderColor: '#759e9e',
                        backgroundColor: 'rgba(117, 158, 158, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Despesa',
                        data: [10000, 11000, 10500, 12000, 11500, 13000],
                        borderColor: '#ff6b6b',
                        backgroundColor: 'rgba(255, 107, 107, 0.0)',
                        tension: 0.4,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Gráfico de Barras: Horas Trabalhadas
        new Chart(document.getElementById('hoursBarChart'), {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
                datasets: [{
                    label: 'Horas',
                    data: [8, 9, 8.5, 8, 7],
                    backgroundColor: '#97b6b6',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

async function renderInstitucionalModule(container) {
    container.innerHTML = `
        <h2 class="mb-4 text-secondary">Institucional & Contratos</h2>
        <div id="empresas-container">
            <div class="text-center"><div class="spinner-border text-primary"></div></div>
        </div>
    `;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/empresas`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const empresas = await response.json();
            const tbody = empresas.map(emp => `
                <tr>
                    <td>${emp.id}</td>
                    <td><strong>${emp.nome}</strong><br><small class="text-muted">${emp.slogan || ''}</small></td>
                    <td>${emp.cnpj}</td>
                    <td>${emp.atividade}</td>
                    <td>${emp.localizacao}</td>
                </tr>
            `).join('');
            
            document.getElementById('empresas-container').innerHTML = `
                <div class="card card-custom"><div class="card-body p-0"><div class="table-responsive">
                <table class="table table-hover mb-0"><thead class="table-light"><tr><th>ID</th><th>Nome</th><th>CNPJ</th><th>Atividade</th><th>Localização</th></tr></thead><tbody>${tbody}</tbody></table>
                </div></div></div>
            `;
        }
    } catch (e) {
        document.getElementById('empresas-container').innerHTML = '<div class="alert alert-danger">Erro ao carregar empresas.</div>';
    }
}