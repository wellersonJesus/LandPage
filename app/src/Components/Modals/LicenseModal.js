import { API_URL } from '../../Services/api.js';
import { AdministracaoTabs } from '../Tabs/AdministracaoTabs.js';

export const LicenseModal = {
    modalId: 'licenseModal',
    formId: 'licenseForm',

    init: () => {
        if (!document.getElementById(LicenseModal.modalId)) {
            const modalHtml = `
                <div class="modal fade" id="${LicenseModal.modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="licenseModalLabel">Gerenciar Licenças</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="${LicenseModal.formId}">
                                    <input type="hidden" id="licenseCompanyId">
                                    <div class="mb-3">
                                        <label for="companyNameDisplay" class="form-label">Empresa</label>
                                        <input type="text" class="form-control" id="companyNameDisplay" disabled>
                                    </div>
                                    <div class="mb-3">
                                        <label for="licenseLimit" class="form-label">Limite de Usuários</label>
                                        <div class="input-group">
                                            <button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('licenseLimit').stepDown()">-</button>
                                            <input type="number" class="form-control text-center" id="licenseLimit" min="1" required>
                                            <button class="btn btn-outline-secondary" type="button" onclick="document.getElementById('licenseLimit').stepUp()">+</button>
                                        </div>
                                        <div class="form-text">Defina o número total de licenças permitidas para esta empresa.</div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" id="btnSaveLicense">Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            document.getElementById('btnSaveLicense').addEventListener('click', LicenseModal.saveLicense);
        }
    },

    open: async (companyId) => {
        LicenseModal.init();
        const token = localStorage.getItem('token');

        try {
            // Busca dados atuais da empresa
            const response = await fetch(`${API_URL}/empresas/${companyId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Erro ao buscar dados da empresa');
            const company = await response.json();

            document.getElementById('licenseCompanyId').value = company.id;
            document.getElementById('companyNameDisplay').value = company.nome;
            document.getElementById('licenseLimit').value = company.limite_usuarios || 5;

            const modal = new bootstrap.Modal(document.getElementById(LicenseModal.modalId));
            modal.show();
        } catch (error) {
            alert(error.message);
        }
    },

    saveLicense: async () => {
        const id = document.getElementById('licenseCompanyId').value;
        const limit = document.getElementById('licenseLimit').value;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/empresas/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ limite_usuarios: parseInt(limit) })
            });

            if (!response.ok) throw new Error('Erro ao atualizar licenças');

            bootstrap.Modal.getInstance(document.getElementById(LicenseModal.modalId)).hide();
            // Atualiza os dados da tabela mantendo a aba atual
            AdministracaoTabs.init();
        } catch (error) {
            alert(error.message);
        }
    }
};