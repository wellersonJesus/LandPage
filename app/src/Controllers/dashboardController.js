/**
 * Controller responsável pela lógica da Dashboard
 */

const API_URL = 'http://localhost:8000/api';

export const dashboardController = {
    init: () => {
        console.log('Dashboard Controller Initialized');
        loadEmpresas();
    }
};

async function loadEmpresas() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/empresas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            window.location.reload();
            return;
        }

        const empresas = await response.json();
        renderTable(empresas);

    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
    }
}

function renderTable(empresas) {
    const dashboardSection = document.getElementById('dashboard-section');
    
    dashboardSection.innerHTML = `
        <h2 class="mb-4 text-secondary">Painel de Empresas</h2>
        <div class="card card-custom">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0" id="empresas-table">
                        <thead class="table-light">
                            <tr><th>ID</th><th>Nome</th><th>CNPJ</th><th>Atividade</th><th>Localização</th></tr>
                        </thead>
                        <tbody>
                            ${empresas.map(emp => `
                                <tr>
                                    <td>${emp.id}</td>
                                    <td><strong>${emp.nome}</strong><br><small class="text-muted">${emp.slogan || ''}</small></td>
                                    <td>${emp.cnpj}</td>
                                    <td>${emp.atividade}</td>
                                    <td>${emp.localizacao}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}