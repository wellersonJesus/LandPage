/**
 * Controller responsável pela lógica da Dashboard
 */

const API_URL = 'http://localhost:8000/api';

// Definição dos Módulos e Permissões
const MODULES = [
    { id: 'dashboard', label: 'Dashboard Principal', icon: 'bi-speedometer2', roles: ['*'] },
    { id: 'financeiro', label: 'Gestão Financeira', icon: 'bi-cash-coin', roles: ['infra_admin', 'financeiro'] },
    { id: 'institucional', label: 'Institucional & Contratos', icon: 'bi-building', roles: ['infra_admin', 'admin', 'gestor'] },
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
    const nome = localStorage.getItem('nome');
    const userNameDisplay = document.getElementById('user-name-display');
    
    if (nome && userNameDisplay) {
        userNameDisplay.textContent = `Olá, ${nome}`;
    }
}

function renderSidebar() {
    const userRole = localStorage.getItem('role');
    const sidebarContainer = document.getElementById('sidebar-nav-items');
    if (!sidebarContainer) return;

    sidebarContainer.innerHTML = '';

    MODULES.forEach(module => {
        // Verifica se o usuário tem permissão (infra_admin tem acesso a tudo)
        if (module.roles.includes('*') || (userRole && module.roles.includes(userRole)) || userRole === 'infra_admin') {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `
                <a class="nav-link" href="#" onclick="window.loadModule('${module.id}', this)">
                    <i class="bi ${module.icon} me-2"></i>
                    ${module.label}
                </a>
            `;
            sidebarContainer.appendChild(li);
        }
    });
}

// Função global para ser chamada pelo onclick
window.loadModule = (moduleId, element) => {
    // Atualiza classe active
    if (element) {
        document.querySelectorAll('.sidebar .nav-link').forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    } else {
        // Se não passou elemento (init), ativa o primeiro correspondente
        const firstLink = document.querySelector(`.sidebar .nav-link[onclick*="${moduleId}"]`);
        if (firstLink) firstLink.classList.add('active');
    }

    const contentDiv = document.getElementById('main-content');
    if (!contentDiv) return;
    
    switch(moduleId) {
        case 'dashboard':
            renderDashboardCharts(contentDiv);
            break;
        case 'financeiro':
            renderGenericModule(contentDiv, 'Gestão Financeira', ['Gestão', 'Lançamentos', 'Empréstimos', 'Investimentos', 'Contas']);
            break;
        case 'institucional':
            renderInstitucionalModule(contentDiv);
            break;
        case 'operacional':
            renderGenericModule(contentDiv, 'Operacional & Ativos', ['Servidores', 'Dispositivos', 'Plataformas', 'Redes', 'Manutenção']);
            break;
        case 'planejamento':
            renderGenericModule(contentDiv, 'Planejamento', ['Calendário', 'Eventos']);
            break;
        case 'skills':
            renderGenericModule(contentDiv, 'Skills & Carreira', ['Skills', 'Cursos']);
            break;
        case 'admin':
            renderGenericModule(contentDiv, 'Administração', ['Usuários', 'Logs do Sistema']);
            break;
        default:
            contentDiv.innerHTML = '<h2>Módulo não encontrado</h2>';
    }
};

function renderDashboardCharts(container) {
    container.innerHTML = `
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard Geral</h1>
        </div>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white fw-bold">Receita vs Despesa (Anual)</div>
                    <div class="card-body">
                        <canvas id="financeChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-white fw-bold">Status dos Servidores</div>
                    <div class="card-body">
                        <canvas id="serverChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Renderiza Gráficos com Chart.js (Simulação)
    if (typeof Chart !== 'undefined') {
        new Chart(document.getElementById('financeChart'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{ label: 'Receita', data: [12, 19, 3, 5, 2, 3], backgroundColor: '#759e9e' }]
            }
        });
        new Chart(document.getElementById('serverChart'), {
            type: 'doughnut',
            data: {
                labels: ['Online', 'Offline'],
                datasets: [{ data: [10, 2], backgroundColor: ['#28a745', '#dc3545'] }]
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

function renderGenericModule(container, title, tabs) {
    const tabsHtml = tabs.map((tab, index) => 
        `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#tab${index}">${tab}</button></li>`
    ).join('');
    
    const contentHtml = tabs.map((tab, index) => 
        `<div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="tab${index}"><div class="alert alert-light border mt-3">Gerenciamento de <strong>${tab}</strong> em breve.</div></div>`
    ).join('');

    container.innerHTML = `
        <h2 class="mb-4 text-secondary">${title}</h2>
        <ul class="nav nav-tabs mb-3">${tabsHtml}</ul>
        <div class="tab-content">${contentHtml}</div>
    `;
}