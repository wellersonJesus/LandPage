import { API_URL } from '../../Services/api.js';

export const UserModal = {
    modalId: 'userModal',
    formId: 'userForm',

    init: () => {
        // Verifica se o modal já existe no DOM para evitar duplicação
        if (!document.getElementById(UserModal.modalId)) {
            const modalHtml = `
                <div class="modal fade" id="${UserModal.modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="userModalLabel">Gerenciar Usuário</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="${UserModal.formId}">
                                    <input type="hidden" id="userId">
                                    <div class="mb-3">
                                        <label for="userName" class="form-label">Nome</label>
                                        <input type="text" class="form-control" id="userName" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="userEmail" class="form-label">E-mail</label>
                                        <input type="email" class="form-control" id="userEmail" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="userPassword" class="form-label">Senha</label>
                                        <input type="password" class="form-control" id="userPassword">
                                        <div class="form-text" id="passwordHelp">Obrigatório para novos usuários.</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="userRole" class="form-label">Função</label>
                                        <select class="form-select" id="userRole" required>
                                            <option value="user">Usuário</option>
                                            <option value="gestor">Gestor</option>
                                            <option value="financeiro">Financeiro</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" id="btnSaveUser">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Adiciona listener para o botão salvar
            document.getElementById('btnSaveUser').addEventListener('click', UserModal.saveUser);
        }
    },

    openNewUser: () => {
        UserModal.init();
        const form = document.getElementById(UserModal.formId);
        form.reset();
        document.getElementById('userId').value = '';
        document.getElementById('userModalLabel').innerText = 'Novo Usuário';
        document.getElementById('passwordHelp').innerText = 'Obrigatório para novos usuários.';
        
        const modal = new bootstrap.Modal(document.getElementById(UserModal.modalId));
        modal.show();
    },

    openEditUser: async (id) => {
        UserModal.init();
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${API_URL}/usuarios/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Erro ao buscar dados do usuário');

            const user = await response.json();

            // Preenche o formulário com os dados existentes
            document.getElementById('userId').value = user.id;
            document.getElementById('userName').value = user.nome || '';
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userRole').value = user.role;
            document.getElementById('userPassword').value = '';
            
            document.getElementById('userModalLabel').innerText = 'Editar Usuário';
            document.getElementById('passwordHelp').innerText = 'Deixe em branco para manter a senha atual.';

            const modal = new bootstrap.Modal(document.getElementById(UserModal.modalId));
            modal.show();

        } catch (error) {
            alert(error.message);
        }
    },

    saveUser: async () => {
        const id = document.getElementById('userId').value;
        const nome = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        const role = document.getElementById('userRole').value;
        const token = localStorage.getItem('token');

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/usuarios/${id}` : `${API_URL}/usuarios`;

        const body = { nome, email, role };
        if (password) body.senha = password;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao salvar usuário');
            }

            // Fecha o modal
            const modalEl = document.getElementById(UserModal.modalId);
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            // Recarrega a lista de usuários (simulando clique no menu admin para refresh)
            const adminLink = document.querySelector(`.sidebar .nav-link[onclick*="'admin'"]`);
            if(adminLink) adminLink.click();

        } catch (error) {
            alert(error.message);
        }
    }
};