import { API_URL } from '../../Services/api.js';
import { FinanceiroTabs } from '../Tabs/FinanceiroTabs.js';

export const FinanceiroModal = {
    modalId: 'financeiroModal',
    formId: 'financeiroForm',

    init: () => {
        if (!document.getElementById(FinanceiroModal.modalId)) {
            const modalHtml = `
                <div class="modal fade" id="${FinanceiroModal.modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="financeiroModalLabel">Gerenciar Registro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="${FinanceiroModal.formId}">
                                    <input type="hidden" id="finId">
                                    <input type="hidden" id="finType">
                                    <div id="financeiroModalFields">
                                        <!-- Campos injetados dinamicamente -->
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" id="btnSaveFinanceiro">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            document.getElementById('btnSaveFinanceiro').addEventListener('click', FinanceiroModal.save);
        }
    },

    openNew: (type) => {
        FinanceiroModal.init();
        FinanceiroModal.renderFields(type);
        document.getElementById('finId').value = '';
        document.getElementById('finType').value = type;
        document.getElementById('financeiroModalLabel').innerText = `Novo ${capitalize(type)}`;
        
        const modal = new bootstrap.Modal(document.getElementById(FinanceiroModal.modalId));
        modal.show();
    },

    openEdit: async (type, id) => {
        FinanceiroModal.init();
        FinanceiroModal.renderFields(type);
        document.getElementById('finId').value = id;
        document.getElementById('finType').value = type;
        document.getElementById('financeiroModalLabel').innerText = `Editar ${capitalize(type)}`;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/${type}/${id}`, {
                 headers: { 'Authorization': `Bearer ${token}` }
            });
            if(response.ok) {
                const data = await response.json();
                FinanceiroModal.populateFields(type, data);
            }
        } catch(e) { console.error(e); }

        const modal = new bootstrap.Modal(document.getElementById(FinanceiroModal.modalId));
        modal.show();
    },

    save: async () => {
        const id = document.getElementById('finId').value;
        const type = document.getElementById('finType').value;
        const token = localStorage.getItem('token');
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${type}/${id}` : `${API_URL}/${type}`;
        
        const body = FinanceiroModal.getFormData(type);

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });
            
            if(response.ok) {
                bootstrap.Modal.getInstance(document.getElementById(FinanceiroModal.modalId)).hide();
                FinanceiroTabs.init();
            } else {
                alert('Erro ao salvar');
            }
        } catch(e) {
            alert(e.message);
        }
    },

    renderFields: (type) => {
        const container = document.getElementById('financeiroModalFields');
        let html = '';
        switch(type) {
            case 'gestao':
                html = `
                    <div class="mb-3"><label class="form-label">Data</label><input type="date" class="form-control" id="finData" required></div>
                    <div class="mb-3"><label class="form-label">Receita</label><input type="number" step="0.01" class="form-control" id="finReceita"></div>
                    <div class="mb-3"><label class="form-label">Despesa</label><input type="number" step="0.01" class="form-control" id="finDespesa"></div>
                `;
                break;
            case 'lancamentos':
                html = `
                    <div class="mb-3"><label class="form-label">Descrição</label><input type="text" class="form-control" id="finDescricao" required></div>
                    <div class="mb-3"><label class="form-label">Valor</label><input type="number" step="0.01" class="form-control" id="finValor"></div>
                    <div class="mb-3"><label class="form-label">Categoria</label>
                        <select class="form-select" id="finCategoria">
                            <option value="Receita">Receita</option>
                            <option value="Despesa">Despesa</option>
                        </select>
                    </div>
                `;
                break;
            case 'contas':
                html = `
                    <div class="mb-3"><label class="form-label">Titular</label><input type="text" class="form-control" id="finTitular" required></div>
                    <div class="mb-3"><label class="form-label">Tipo de Conta</label><input type="text" class="form-control" id="finTipoConta" required></div>
                    <div class="mb-3"><label class="form-label">Identificador</label><input type="text" class="form-control" id="finIdentificador" required></div>
                `;
                break;
            case 'emprestimos':
                html = `
                    <div class="mb-3"><label class="form-label">Descrição</label><input type="text" class="form-control" id="finDescricao" required></div>
                    <div class="mb-3"><label class="form-label">Valor Total</label><input type="number" step="0.01" class="form-control" id="finValorTotal"></div>
                    <div class="mb-3"><label class="form-label">Valor Pago</label><input type="number" step="0.01" class="form-control" id="finValorPago"></div>
                    <div class="mb-3"><label class="form-label">Valor a Pagar</label><input type="number" step="0.01" class="form-control" id="finValorAPagar"></div>
                `;
                break;
            case 'investimentos':
                html = `
                    <div class="mb-3"><label class="form-label">Tipo</label><input type="text" class="form-control" id="finTipo" required></div>
                    <div class="mb-3"><label class="form-label">Descrição</label><input type="text" class="form-control" id="finDescricao" required></div>
                    <div class="mb-3"><label class="form-label">Valor Investido</label><input type="number" step="0.01" class="form-control" id="finValorInvestido"></div>
                    <div class="mb-3"><label class="form-label">Valor Atual</label><input type="number" step="0.01" class="form-control" id="finValorAtual"></div>
                `;
                break;
            default:
                html = '<p class="text-muted">Formulário para este tipo em desenvolvimento.</p>';
        }
        container.innerHTML = html;
    },

    getFormData: (type) => {
        const data = {};
        if(type === 'gestao') {
            data.data = document.getElementById('finData').value;
            data.receita = document.getElementById('finReceita').value;
            data.despesa = document.getElementById('finDespesa').value;
        } else if (type === 'lancamentos') {
            data.descricao = document.getElementById('finDescricao').value;
            data.valor = document.getElementById('finValor').value;
            data.categoria = document.getElementById('finCategoria').value;
        } else if (type === 'contas') {
            data.titular = document.getElementById('finTitular').value;
            data.tipo_conta = document.getElementById('finTipoConta').value;
            data.identificador = document.getElementById('finIdentificador').value;
        } else if (type === 'emprestimos') {
            data.descricao = document.getElementById('finDescricao').value;
            data.valor_total = document.getElementById('finValorTotal').value;
            data.valor_pago = document.getElementById('finValorPago').value;
            data.valor_a_pagar = document.getElementById('finValorAPagar').value;
        } else if (type === 'investimentos') {
            data.tipo = document.getElementById('finTipo').value;
            data.descricao = document.getElementById('finDescricao').value;
            data.valor_investido = document.getElementById('finValorInvestido').value;
            data.valor_atual = document.getElementById('finValorAtual').value;
        }
        return data;
    },
    
    populateFields: (type, data) => {
        if(type === 'gestao') {
            document.getElementById('finData').value = data.data;
            document.getElementById('finReceita').value = data.receita;
            document.getElementById('finDespesa').value = data.despesa;
        } else if (type === 'lancamentos') {
            document.getElementById('finDescricao').value = data.descricao;
            document.getElementById('finValor').value = data.valor;
            document.getElementById('finCategoria').value = data.categoria;
        } else if (type === 'contas') {
            document.getElementById('finTitular').value = data.titular;
            document.getElementById('finTipoConta').value = data.tipo_conta;
            document.getElementById('finIdentificador').value = data.identificador;
        } else if (type === 'emprestimos') {
            document.getElementById('finDescricao').value = data.descricao;
            document.getElementById('finValorTotal').value = data.valor_total;
            document.getElementById('finValorPago').value = data.valor_pago;
            document.getElementById('finValorAPagar').value = data.valor_a_pagar;
        } else if (type === 'investimentos') {
            document.getElementById('finTipo').value = data.tipo;
            document.getElementById('finDescricao').value = data.descricao;
            document.getElementById('finValorInvestido').value = data.valor_investido;
            document.getElementById('finValorAtual').value = data.valor_atual;
        }
    }
};

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }