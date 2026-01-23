import { API_URL } from '../../Services/api.js';

export const AdministracaoTabs = {
    init: async () => {
        await loadUsers();
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
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})" title="Excluir">
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