import { API_URL } from '../Services/api.js';
import { UserModal } from '../Components/Modals/UserModal.js';
import { LicenseModal } from '../Components/Modals/LicenseModal.js';
import { AuditModal } from '../Components/Modals/AuditModal.js';
import { AdministracaoTabs } from '../Components/Tabs/AdministracaoTabs.js';

export const administracaoController = {
    render: async (container) => {
        const title = 'Administração';

        // Definição das Abas Principais e seus Sub-itens
        const mainTabs = [
            { id: 'admin', label: 'Admin', sub: ['Usuários', 'Governança'] }
        ];

        // Constrói a Navegação Principal
        const navHtml = mainTabs.map((tab, index) => 
            `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#main-tab-${tab.id}">${tab.label}</button></li>`
        ).join('');

        // Constrói o Conteúdo das Abas
        const contentHtml = mainTabs.map((tab, index) => {
            const isActive = index === 0 ? 'show active' : '';
            
            // Lógica específica para a aba Admin (que contém a tabela real)
            if (tab.id === 'admin') {
                return `
                    <div class="tab-pane fade ${isActive}" id="main-tab-${tab.id}">
                        <ul class="nav nav-tabs mb-3" id="admin-sub-tabs">
                            <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#admin-sub-users">Usuários</button></li>
                            <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#admin-sub-governance">Governança</button></li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="admin-sub-users">
                                <div class="d-flex justify-content-end align-items-center mb-3">
                                    <div class="input-group w-50">
                                        <input type="text" class="form-control" id="search-users" placeholder="Buscar usuário..." oninput="filterUsers()">
                                        <button class="btn btn-outline-secondary" type="button" onclick="filterUsers()"><i class="bi bi-search"></i></button>
                                    </div>
                                </div>
                                <div class="card card-custom shadow-sm border-0">
                                    <div class="card-body p-0">
                                        <div class="table-responsive">
                                            <table class="table table-hover align-middle mb-0">
                                                <thead class="bg-light">
                                                    <tr>
                                                        <th class="ps-4">Usuário</th>
                                                        <th>Email</th>
                                                        <th>Função (Role)</th>
                                                        <th>Data Cadastro</th>
                                                        <th class="text-end pe-4">Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="admin-users-table">
                                                    <tr><td colspan="5" class="text-center py-4"><div class="spinner-border text-primary"></div></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="admin-sub-governance">
                                <div class="d-flex justify-content-end align-items-center mb-3">
                                    <div class="input-group w-50">
                                        <input type="text" class="form-control" id="search-governance" placeholder="Buscar empresa..." oninput="filterGovernance()">
                                        <button class="btn btn-outline-secondary" type="button" onclick="filterGovernance()"><i class="bi bi-search"></i></button>
                                    </div>
                                </div>
                                <div class="card card-custom shadow-sm border-0">
                                    <div class="card-body p-0">
                                        <div class="table-responsive">
                                            <table class="table table-hover align-middle mb-0">
                                                <thead class="bg-light">
                                                    <tr>
                                                        <th class="ps-4">Empresa</th>
                                                        <th>Licenças (Uso/Limite)</th>
                                                        <th>Status</th>
                                                        <th class="text-end pe-4">Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="admin-governance-table">
                                                    <tr><td colspan="4" class="text-center py-4"><div class="spinner-border text-primary"></div></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Lógica para as outras abas (Placeholders com sub-abas)
            const subNav = tab.sub.map((sub, i) => 
                `<li class="nav-item"><button class="nav-link ${i === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#sub-${tab.id}-${i}">${sub}</button></li>`
            ).join('');
            
            const subContent = tab.sub.map((sub, i) => 
                `<div class="tab-pane fade ${i === 0 ? 'show active' : ''}" id="sub-${tab.id}-${i}">
                    <div class="alert alert-light border mt-3">Módulo <strong>${sub}</strong> em desenvolvimento.</div>
                </div>`
            ).join('');

            return `
                <div class="tab-pane fade ${isActive}" id="main-tab-${tab.id}">
                    <ul class="nav nav-pills mb-3 small">${subNav}</ul>
                    <div class="tab-content">${subContent}</div>
                </div>
            `;
        }).join('');

        // Renderiza a estrutura completa no container
        container.innerHTML = `
            <h2 class="mb-4 text-secondary">${title}</h2>
            <ul class="nav nav-tabs mb-3">${navHtml}</ul>
            <div class="tab-content">${contentHtml}</div>
        `;

        // Inicializa a lógica das abas (carregamento de usuários)
        AdministracaoTabs.init();
    }
};

// Funções globais para ações da tabela (necessárias pois são chamadas via onclick no HTML injetado)
window.openNewUser = () => UserModal.openNewUser();
window.editUser = (id) => UserModal.openEditUser(id);

window.updateUserRole = async (id, newRole) => {
    const token = localStorage.getItem('token');
    if(!confirm(`Deseja alterar a permissão deste usuário para ${newRole}?`)) return;

    await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
    });
};

window.deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    if(!confirm('Tem certeza? Esta ação não pode ser desfeita.')) return;

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if(response.ok) {
        // Recarrega o módulo simulando um clique no menu
        const adminLink = document.querySelector(`.sidebar .nav-link[onclick*="'admin'"]`);
        if(adminLink) adminLink.click();
    } else {
        const data = await response.json();
        alert(data.error || 'Erro ao excluir');
    }
};

// Funções globais para Governança
window.manageLicenses = (id) => LicenseModal.open(id);
window.auditAccess = (id) => AuditModal.open(id);

// Função de filtro para usuários
window.filterUsers = () => {
    AdministracaoTabs.init();
};

// Função de filtro para governança
window.filterGovernance = () => {
    AdministracaoTabs.loadGovernance();
};