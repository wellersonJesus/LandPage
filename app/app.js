const API_URL = 'http://localhost:8000/api';

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function checkAuth() {
    const token = localStorage.getItem('token');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const navbar = document.getElementById('navbar');

    if (token) {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        navbar.style.display = 'block';
        loadEmpresas();
    } else {
        loginSection.style.display = 'flex';
        dashboardSection.style.display = 'none';
        navbar.style.display = 'none';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const errorDiv = document.getElementById('login-error');

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            errorDiv.style.display = 'none';
            checkAuth();
        } else {
            throw new Error(data.message || 'Erro ao fazer login');
        }
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
}

async function loadEmpresas() {
    const token = localStorage.getItem('token');
    const tbody = document.querySelector('#empresas-table tbody');

    try {
        const response = await fetch(`${API_URL}/empresas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401 || response.status === 403) {
            logout();
            return;
        }

        const empresas = await response.json();
        
        // Reconstrói a estrutura da tabela se ela não existir (caso o HTML tenha sido limpo)
        const dashboardSection = document.getElementById('dashboard-section');
        if (!document.getElementById('empresas-table')) {
            dashboardSection.innerHTML = `
                <h2 class="mb-4 text-secondary">Painel de Empresas</h2>
                <div class="card card-custom">
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0" id="empresas-table">
                                <thead class="table-light">
                                    <tr><th>ID</th><th>Nome</th><th>CNPJ</th><th>Atividade</th><th>Localização</th></tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        const newTbody = document.querySelector('#empresas-table tbody');
        newTbody.innerHTML = '';

        empresas.forEach(emp => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${emp.id}</td>
                <td><strong>${emp.nome}</strong><br><small class="text-muted">${emp.slogan || ''}</small></td>
                <td>${emp.cnpj}</td>
                <td>${emp.atividade}</td>
                <td>${emp.localizacao}</td>
            `;
            newTbody.appendChild(tr);
        });

    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    checkAuth();
}