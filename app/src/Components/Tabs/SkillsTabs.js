import { API_URL } from '../../Services/api.js';

export const SkillsTabs = {
    init: () => {
        loadData('skills', 'skills');
        loadData('cursos', 'cursos');
        loadData('redes', 'redes');
    },
    loadData: loadData
};

async function loadData(endpoint, tableIdSuffix) {
    const token = localStorage.getItem('token');
    const tbody = document.getElementById(`skill-${tableIdSuffix}-table`);
    const searchTerm = document.getElementById(`search-${tableIdSuffix}`)?.value.toLowerCase() || '';
    if (!tbody) return;

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error('Erro ao carregar dados');
        
        let data = await response.json();
        if (searchTerm) data = data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm)));

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
            <button class="btn btn-sm btn-outline-success me-1" onclick="openNewSkill('${type}')" title="Novo"><i class="bi bi-plus-lg"></i></button>
            <button class="btn btn-sm btn-outline-primary me-1" onclick="editSkill('${type}', ${item.id})" title="Atualizar"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteSkill('${type}', ${item.id})" title="Remover"><i class="bi bi-trash"></i></button>
        </td>
    `;

    if (type === 'skills') {
        return `<tr>
            <td class="ps-4 fw-bold">${item.nome}</td>
            <td>${item.categoria}</td>
            <td><span class="badge bg-info text-dark">${item.nivel}</span></td>
            ${actions}
        </tr>`;
    } else if (type === 'cursos') {
        return `<tr>
            <td class="ps-4 fw-bold">${item.nome}</td>
            <td>${item.email}</td>
            <td>${item.usuario}</td>
            ${actions}
        </tr>`;
    } else if (type === 'redes') {
        return `<tr>
            <td class="ps-4 fw-bold">${item.categoria}</td>
            <td>${item.descricao}</td>
            <td>${item.email}</td>
            ${actions}
        </tr>`;
    }
}