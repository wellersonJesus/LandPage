import { API_URL } from '../Services/api.js';
import { FinanceiroTabs } from '../Components/Tabs/FinanceiroTabs.js';
import { FinanceiroModal } from '../Components/Modals/FinanceiroModal.js';

export const financeiroController = {
    render: async (container) => {
        const title = 'Gestão';
        
        // Definição das Abas
        const tabs = [
            { id: 'gestao', label: 'Gestão' },
            { id: 'lancamentos', label: 'Lançamentos' },
            { id: 'emprestimos', label: 'Empréstimos' },
            { id: 'investimentos', label: 'Investimentos' },
            { id: 'contas', label: 'Contas' }
        ];

        // Constrói a Navegação
        const navHtml = tabs.map((tab, index) => 
            `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#fin-tab-${tab.id}">${tab.label}</button></li>`
        ).join('');

        // Constrói o Conteúdo (Tabelas vazias com Spinner)
        const contentHtml = tabs.map((tab, index) => {
            const isActive = index === 0 ? 'show active' : '';
            return `
                <div class="tab-pane fade ${isActive}" id="fin-tab-${tab.id}">
                    <div class="card card-custom shadow-sm border-0">
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0">
                                    <thead class="bg-light">
                                        <tr>
                                            ${getHeaders(tab.id)}
                                            <th class="text-end pe-4">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody id="fin-${tab.id}-table">
                                        <tr><td colspan="100%" class="text-center py-4"><div class="spinner-border text-primary"></div></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <h2 class="mb-4 text-secondary">${title}</h2>
            <ul class="nav nav-tabs mb-3">${navHtml}</ul>
            <div class="tab-content">${contentHtml}</div>
        `;

        // Inicializa o carregamento dos dados
        FinanceiroTabs.init();
    }
};

function getHeaders(tabId) {
    switch(tabId) {
        case 'gestao': return '<th>Data</th><th>Receita</th><th>Despesa</th><th>Lucro</th>';
        case 'lancamentos': return '<th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th>';
        case 'contas': return '<th>Titular</th><th>Tipo</th><th>Identificador</th>';
        case 'emprestimos': return '<th>Descrição</th><th>Valor Total</th><th>Pago</th><th>A Pagar</th>';
        case 'investimentos': return '<th>Tipo</th><th>Descrição</th><th>Investido</th><th>Atual</th>';
        default: return '';
    }
}

// Funções globais para ações (Placeholders)
window.openNewFinanceiro = (type) => FinanceiroModal.openNew(type);
window.editFinanceiro = (type, id) => FinanceiroModal.openEdit(type, id);

window.deleteFinanceiro = async (type, id) => {
    if(!confirm('Deseja excluir este registro?')) return;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/${type}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if(response.ok) {
            FinanceiroTabs.init();
        } else {
            alert('Erro ao excluir');
        }
    } catch(e) {
        alert(e.message);
    }
};