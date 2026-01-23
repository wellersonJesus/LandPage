import { API_URL } from '../../Services/api.js';

export const FinanceiroTabs = {
    init: () => {
        loadData('gestao', 'gestao');
        loadData('lancamentos', 'lancamentos');
        loadData('contas', 'contas');
        loadData('emprestimos', 'emprestimos');
        loadData('investimentos', 'investimentos');
    },
    loadData: loadData // Expõe a função para ser usada no filtro
};

async function loadData(endpoint, tableIdSuffix) {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById(`fin-${tableIdSuffix}-table`);
    const searchTerm = document.getElementById(`search-${tableIdSuffix}`)?.value.toLowerCase() || '';
    if (!tbody) return;

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Erro ao carregar dados');
        
        let data = await response.json();
        
        // Filtragem no frontend
        if (searchTerm) {
            data = data.filter(item => {
                return Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm));
            });
        }

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="100%" class="text-center py-4">Nenhum registro encontrado.</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(item => renderRow(tableIdSuffix, item)).join('');

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="100%" class="text-center text-danger py-4">${error.message}</td></tr>`;
    }
}

function renderRow(type, item) {
    const actions = `
        <td class="text-end pe-4">
            <button class="btn btn-sm btn-outline-primary me-1" onclick="editFinanceiro('${type}', ${item.id})" title="Atualizar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteFinanceiro('${type}', ${item.id})" title="Remover"><i class="bi bi-trash"></i></button>
        </td>
    `;

    switch(type) {
        case 'gestao':
            return `<tr>
                <td class="ps-4">${item.data}</td>
                <td class="text-success">R$ ${item.receita}</td>
                <td class="text-danger">R$ ${item.despesa}</td>
                <td class="fw-bold">R$ ${item.lucro}</td>
                ${actions}
            </tr>`;
        case 'lancamentos':
            return `<tr>
                <td class="ps-4">${item.mes}/${item.ano}</td>
                <td>${item.descricao}</td>
                <td><span class="badge bg-secondary">${item.categoria}</span></td>
                <td class="${item.categoria === 'Receita' ? 'text-success' : 'text-danger'}">R$ ${item.valor}</td>
                ${actions}
            </tr>`;
        case 'contas':
            return `<tr>
                <td class="ps-4 fw-bold">${item.titular}</td>
                <td>${item.tipo_conta}</td>
                <td>${item.identificador}</td>
                ${actions}
            </tr>`;
        case 'emprestimos':
            return `<tr>
                <td class="ps-4">${item.descricao}</td>
                <td>R$ ${item.valor_total}</td>
                <td class="text-success">R$ ${item.valor_pago}</td>
                <td class="text-danger">R$ ${item.valor_a_pagar}</td>
                ${actions}
            </tr>`;
        case 'investimentos':
            return `<tr>
                <td class="ps-4"><span class="badge bg-info text-dark">${item.tipo}</span></td>
                <td>${item.descricao}</td>
                <td>R$ ${item.valor_investido}</td>
                <td class="fw-bold text-success">R$ ${item.valor_atual}</td>
                ${actions}
            </tr>`;
        default: return '';
    }
}