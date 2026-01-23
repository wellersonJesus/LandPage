import { API_URL } from '../../Services/api.js';
import { SkillsTabs } from '../Tabs/SkillsTabs.js';

export const SkillsModal = {
    modalId: 'skillsModal',
    formId: 'skillsForm',

    init: () => {
        if (!document.getElementById(SkillsModal.modalId)) {
            const modalHtml = `
                <div class="modal fade" id="${SkillsModal.modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="skillsModalLabel">Gerenciar Registro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="${SkillsModal.formId}">
                                    <input type="hidden" id="skillId">
                                    <input type="hidden" id="skillType">
                                    <div id="skillsModalFields"></div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" id="btnSaveSkill">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            document.getElementById('btnSaveSkill').addEventListener('click', SkillsModal.save);
        }
    },

    openNew: (type) => {
        SkillsModal.init();
        SkillsModal.renderFields(type);
        document.getElementById('skillId').value = '';
        document.getElementById('skillType').value = type;
        document.getElementById('skillsModalLabel').innerText = `Novo ${capitalize(type)}`;
        new bootstrap.Modal(document.getElementById(SkillsModal.modalId)).show();
    },

    openEdit: async (type, id) => {
        SkillsModal.init();
        SkillsModal.renderFields(type);
        document.getElementById('skillId').value = id;
        document.getElementById('skillType').value = type;
        document.getElementById('skillsModalLabel').innerText = `Editar ${capitalize(type)}`;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/${type}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
            if(response.ok) SkillsModal.populateFields(type, await response.json());
        } catch(e) { console.error(e); }

        new bootstrap.Modal(document.getElementById(SkillsModal.modalId)).show();
    },

    save: async () => {
        const id = document.getElementById('skillId').value;
        const type = document.getElementById('skillType').value;
        const token = localStorage.getItem('token');
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${type}/${id}` : `${API_URL}/${type}`;
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(SkillsModal.getFormData(type))
            });
            
            if(response.ok) {
                bootstrap.Modal.getInstance(document.getElementById(SkillsModal.modalId)).hide();
                SkillsTabs.init();
            } else {
                alert('Erro ao salvar');
            }
        } catch(e) { alert(e.message); }
    },

    renderFields: (type) => {
        const container = document.getElementById('skillsModalFields');
        let html = '';
        if (type === 'skills') {
            html = `
                <div class="mb-3"><label class="form-label">Nome</label><input type="text" class="form-control" id="skNome" required></div>
                <div class="mb-3"><label class="form-label">Categoria</label><input type="text" class="form-control" id="skCategoria"></div>
                <div class="mb-3"><label class="form-label">Nível</label><input type="text" class="form-control" id="skNivel"></div>
            `;
        } else if (type === 'cursos' || type === 'redes') {
            const label1 = type === 'cursos' ? 'Nome' : 'Categoria';
            const label2 = type === 'cursos' ? 'Usuário' : 'Descrição';
            html = `
                <div class="mb-3"><label class="form-label">${label1}</label><input type="text" class="form-control" id="skField1" required></div>
                <div class="mb-3"><label class="form-label">Email</label><input type="email" class="form-control" id="skEmail"></div>
                <div class="mb-3"><label class="form-label">${label2}</label><input type="text" class="form-control" id="skField2"></div>
                <div class="mb-3"><label class="form-label">Senha</label><input type="text" class="form-control" id="skSenha"></div>
                <div class="mb-3"><label class="form-label">Tokens</label><input type="text" class="form-control" id="skTokens"></div>
            `;
        }
        container.innerHTML = html;
    },

    getFormData: (type) => {
        if(type === 'skills') return {
            nome: document.getElementById('skNome').value,
            categoria: document.getElementById('skCategoria').value,
            nivel: document.getElementById('skNivel').value
        };
        return {
            [type === 'cursos' ? 'nome' : 'categoria']: document.getElementById('skField1').value,
            email: document.getElementById('skEmail').value,
            [type === 'cursos' ? 'usuario' : 'descricao']: document.getElementById('skField2').value,
            senha: document.getElementById('skSenha').value,
            tokens: document.getElementById('skTokens').value
        };
    },
    
    populateFields: (type, data) => {
        if(type === 'skills') {
            document.getElementById('skNome').value = data.nome;
            document.getElementById('skCategoria').value = data.categoria;
            document.getElementById('skNivel').value = data.nivel;
        } else {
            document.getElementById('skField1').value = type === 'cursos' ? data.nome : data.categoria;
            document.getElementById('skEmail').value = data.email;
            document.getElementById('skField2').value = type === 'cursos' ? data.usuario : data.descricao;
            document.getElementById('skSenha').value = data.senha;
            document.getElementById('skTokens').value = data.tokens;
        }
    }
};
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }