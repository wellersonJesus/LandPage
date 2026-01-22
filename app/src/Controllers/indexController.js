/**
 * Controller responsável pela lógica da página Index
 */

const API_URL = 'http://localhost:8000/api';

export const indexController = {
    init: () => {
        console.log('Index Controller Initialized');
        
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            // Remove listeners antigos para evitar duplicação se init for chamado várias vezes
            const newLoginForm = loginForm.cloneNode(true);
            loginForm.parentNode.replaceChild(newLoginForm, loginForm);
            newLoginForm.addEventListener('submit', handleLogin);
        }
    }
};

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const errorDiv = document.getElementById('login-error');

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('nome', data.nome); // Salva o nome vindo do banco USUARIO
            errorDiv.style.display = 'none';
            
            // Recarrega a página para o app.js redirecionar para o dashboard
            window.location.reload();
        } else {
            throw new Error(data.message || 'Erro ao fazer login');
        }
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
}