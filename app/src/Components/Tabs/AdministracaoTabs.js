import { API_URL } from '../../Services/api.js';

export const AdministracaoTabs = {
    init: async () => {
        loadUsers();
        loadGovernance();
    }
};

async function loadUsers() {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById('admin-users-table');
    
    if (!tbody) return;

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Falha ao carregar usuários');
        
        const users = await response.json();
        
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Nenhum usuário encontrado.</td></tr>';
            return;
        }

        tbody.innerHTML = users.map(user => {
            const isProtected = user.role === 'infra_admin';
            return `
            <tr>
                <td class="ps-4 fw-bold">
                    <div class="d-flex align-items-center">
                        <div class="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                            <i class="bi bi-person text-secondary"></i>
                        </div>
                        ${user.nome || 'Sem Nome'}
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <select class="form-select form-select-sm" style="width: 140px;" 
                        onchange="updateUserRole(${user.id}, this.value)" ${isProtected ? 'disabled' : ''}>
                        <option value="user" ${user.role === 'user' ? 'selected' : ''}>Usuário</option>
                        <option value="gestor" ${user.role === 'gestor' ? 'selected' : ''}>Gestor</option>
                        <option value="financeiro" ${user.role === 'financeiro' ? 'selected' : ''}>Financeiro</option>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                        ${isProtected ? '<option value="infra_admin" selected>Super Admin</option>' : ''}
                    </select>
                </td>
                <td class="text-muted small">${new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                <td class="text-end pe-4">
                    ${!isProtected ? `
                        <button class="btn btn-sm btn-outline-success me-1" onclick="openNewUser()" title="Novo">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editUser(${user.id})" title="Atualizar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})" title="Remover">
                            <i class="bi bi-trash"></i>
                        </button>
                    ` : '<span class="badge bg-secondary"><i class="bi bi-shield-lock"></i> Protegido</span>'}
                </td>
            </tr>
        `}).join('');

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">${error.message}</td></tr>`;
    }
}

async function loadGovernance() {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById('admin-governance-table');
    
    if (!tbody) return;

    try {
        // Busca empresas para exibir status de governança
        let companies = [];
        try {
            const response = await fetch(`${API_URL}/empresas`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                companies = await response.json();
            } else {
                throw new Error('API indisponível');
            }
        } catch (e) {
            // Mock de dados de governança caso a API de empresas falhe
            companies = [
                { id: 1, nome: 'Tech Solutions', limite_usuarios: 10, usuarios_ativos: 4 },
                { id: 2, nome: 'Agro Business', limite_usuarios: 5, usuarios_ativos: 5 },
                { id: 3, nome: 'Educa Mais', limite_usuarios: 3, usuarios_ativos: 1 }
            ];
        }
        
        if (companies.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">Nenhuma empresa encontrada para governança.</td></tr>';
            return;
        }

        tbody.innerHTML = companies.map(comp => {
            // Mock de contagem se não vier da API
            const limit = comp.limite_usuarios || 5;
            const active = comp.usuarios_ativos || Math.floor(Math.random() * limit); 
            const usagePercent = (active / limit) * 100;
            const statusColor = usagePercent >= 100 ? 'danger' : (usagePercent > 80 ? 'warning' : 'success');

            return `
            <tr>
                <td class="ps-4 fw-bold">${comp.nome}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="progress flex-grow-1 me-2" style="height: 6px;">
                            <div class="progress-bar bg-${statusColor}" role="progressbar" style="width: ${usagePercent}%"></div>
                        </div>
                        <span class="small fw-bold text-${statusColor}">${active}/${limit}</span>
                    </div>
                </td>
                <td><span class="badge bg-${statusColor} bg-opacity-10 text-${statusColor} px-2 py-1 rounded-pill">${usagePercent >= 100 ? 'Limite Atingido' : 'Regular'}</span></td>
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="manageLicenses(${comp.id})" title="Gerenciar Licenças">
                        <i class="bi bi-sliders"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="auditAccess(${comp.id})" title="Auditoria">
                        <i class="bi bi-eye"></i>
                    </button>
                </td>
            </tr>
        `}).join('');

    } catch (error) {
        // Exibe erro na tabela caso a API falhe ou não exista ainda
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger py-4">${error.message}</td></tr>`;
    }
}