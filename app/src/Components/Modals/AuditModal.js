import { API_URL } from '../../Services/api.js';

export const AuditModal = {
    modalId: 'auditModal',

    init: () => {
        if (!document.getElementById(AuditModal.modalId)) {
            const modalHtml = `
                <div class="modal fade" id="${AuditModal.modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"><i class="bi bi-shield-check me-2"></i>Auditoria de Acessos</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h6 id="auditCompanyName" class="text-muted mb-3"></h6>
                                <div class="table-responsive">
                                    <table class="table table-sm table-hover align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Data/Hora</th>
                                                <th>Usuário</th>
                                                <th>Ação</th>
                                                <th>IP Origem</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="auditLogTableBody">
                                            <!-- Logs injetados via JS -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
    },

    open: async (companyId) => {
        AuditModal.init();
        const token = localStorage.getItem('token');
        const tbody = document.getElementById('auditLogTableBody');
        const title = document.getElementById('auditCompanyName');
        
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-3"><div class="spinner-border spinner-border-sm text-primary"></div> Carregando logs...</td></tr>';
        
        try {
            // Busca nome da empresa para exibir no título
            const responseComp = await fetch(`${API_URL}/empresas/${companyId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (responseComp.ok) {
                const company = await responseComp.json();
                title.textContent = `Logs recentes para: ${company.nome}`;
            } else {
                title.textContent = `Logs da Empresa #${companyId}`;
            }

            // Simulação de Logs (Mock)
            setTimeout(() => {
                const logs = [
                    { date: new Date().toLocaleString('pt-BR'), user: 'admin@landpage.com', action: 'Alteração de Licenças', ip: '192.168.1.10', status: 'Sucesso' },
                    { date: new Date(Date.now() - 3600000).toLocaleString('pt-BR'), user: 'gestor@empresa.com', action: 'Login no Sistema', ip: '200.10.5.42', status: 'Sucesso' },
                    { date: new Date(Date.now() - 7200000).toLocaleString('pt-BR'), user: 'financeiro@empresa.com', action: 'Exportação de Relatório', ip: '200.10.5.45', status: 'Sucesso' },
                    { date: new Date(Date.now() - 86400000).toLocaleString('pt-BR'), user: 'unknown@ip.com', action: 'Tentativa de Login', ip: '45.23.11.9', status: 'Falha' },
                    { date: new Date(Date.now() - 90000000).toLocaleString('pt-BR'), user: 'admin@landpage.com', action: 'Criação de Usuário', ip: '192.168.1.10', status: 'Sucesso' }
                ];

                tbody.innerHTML = logs.map(log => `
                    <tr>
                        <td class="small text-nowrap">${log.date}</td>
                        <td class="small">${log.user}</td>
                        <td class="small">${log.action}</td>
                        <td class="small text-muted font-monospace">${log.ip}</td>
                        <td><span class="badge bg-${log.status === 'Sucesso' ? 'success' : 'danger'} bg-opacity-10 text-${log.status === 'Sucesso' ? 'success' : 'danger'}">${log.status}</span></td>
                    </tr>
                `).join('');
            }, 600);

            const modal = new bootstrap.Modal(document.getElementById(AuditModal.modalId));
            modal.show();

        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Erro ao carregar logs: ${error.message}</td></tr>`;
        }
    }
};