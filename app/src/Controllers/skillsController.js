import { API_URL } from '../Services/api.js';
import { SkillsTabs } from '../Components/Tabs/SkillsTabs.js';
import { SkillsModal } from '../Components/Modals/SkillsModal.js';

export const skillsController = {
    render: async (container) => {
        const title = 'Skills & Carreira';
        const tabs = [
            { id: 'skills', label: 'Skills' },
            { id: 'cursos', label: 'Cursos' },
            { id: 'redes', label: 'Redes' }
        ];

        const navHtml = tabs.map((tab, index) => 
            `<li class="nav-item"><button class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#skill-tab-${tab.id}">${tab.label}</button></li>`
        ).join('');

        const contentHtml = tabs.map((tab, index) => {
            const isActive = index === 0 ? 'show active' : '';
            return `
                <div class="tab-pane fade ${isActive}" id="skill-tab-${tab.id}">
                    <div class="d-flex justify-content-end align-items-center mb-3">
                        <div class="input-group w-50">
                            <input type="text" class="form-control" id="search-${tab.id}" placeholder="Buscar..." oninput="filterSkills('${tab.id}')">
                            <button class="btn btn-outline-secondary" type="button" onclick="filterSkills('${tab.id}')"><i class="bi bi-search"></i></button>
                        </div>
                    </div>
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
                                    <tbody id="skill-${tab.id}-table">
                                        <tr><td colspan="100%" class="text-center py-4"><div class="spinner-border text-primary"></div></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `<h2 class="mb-4 text-secondary">${title}</h2><ul class="nav nav-tabs mb-3">${navHtml}</ul><div class="tab-content">${contentHtml}</div>`;
        SkillsTabs.init();
    }
};

function getHeaders(tabId) {
    if (tabId === 'skills') return '<th>Nome</th><th>Categoria</th><th>Nível</th>';
    if (tabId === 'cursos') return '<th>Nome</th><th>Email</th><th>Usuário</th>';
    if (tabId === 'redes') return '<th>Categoria</th><th>Descrição</th><th>Email</th>';
    return '';
}

window.openNewSkill = (type) => SkillsModal.openNew(type);
window.editSkill = (type, id) => SkillsModal.openEdit(type, id);
window.filterSkills = (type) => SkillsTabs.loadData(type, type);
window.deleteSkill = async (type, id) => {
    if(!confirm('Deseja excluir?')) return;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/${type}/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        if(response.ok) SkillsTabs.init(); else alert('Erro ao excluir');
    } catch(e) { alert(e.message); }
};