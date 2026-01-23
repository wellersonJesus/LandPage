import { API_URL } from '../Services/api.js';
import { UserModal } from '../Components/Modals/UserModal.js';
import { AdministracaoTabs } from '../Components/Tabs/AdministracaoTabs.js';

export const administracaoController = {
    render: async (container) => {
        // Define as abas do módulo
        const tabs = ['Usuários', 'Configurações'];
        const title = 'Administração';

        // Constrói o HTML da navegação das abas (Padrão GenericTabs)
        const tabsNav = tabs.map((tab, index) => 
            `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#tab-${index}">${tab}</button></li>`
        ).join('');

        // Conteúdo da Aba 1: Tabela de Usuários
        const usersTabContent = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="text-muted">Gerenciamento de Usuários</h5>
                <button class="btn btn-primary btn-sm" id="btn-new-user"><i class="bi bi-plus-lg me-1"></i>Novo Usuário</button>
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
        `;

        // Conteúdo da Aba 2: Configurações (Placeholder)
        const configTabContent = `<div class="alert alert-light border mt-3">Configurações globais do sistema em breve.</div>`;

        // Renderiza a estrutura completa no container
        container.innerHTML = `
            <h2 class="mb-4 text-secondary">${title}</h2>
            <ul class="nav nav-tabs mb-3">${tabsNav}</ul>
            <div class="tab-content" id="adminTabsContent">
                <div class="tab-pane fade show active" id="tab-0">${usersTabContent}</div>
                <div class="tab-pane fade" id="tab-1">${configTabContent}</div>
            </div>
        `;

        // Vincula o evento do botão "Novo Usuário"
        const btnNewUser = document.getElementById('btn-new-user');
        if (btnNewUser) {
            btnNewUser.onclick = () => UserModal.openNewUser();
        }

        // Inicializa a lógica das abas (carregamento de usuários)
        AdministracaoTabs.init();
    }
};

// Funções globais para ações da tabela (necessárias pois são chamadas via onclick no HTML injetado)
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