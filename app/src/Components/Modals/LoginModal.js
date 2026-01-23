import { API_URL } from '../../Services/api.js';

export const LoginModal = {
    init: () => {
        const loginForm = document.getElementById('loginForm');
        if (!loginForm) return;

        // Remove listeners antigos para evitar duplicação (caso init seja chamado múltiplas vezes)
        const newLoginForm = loginForm.cloneNode(true);
        loginForm.parentNode.replaceChild(newLoginForm, loginForm);

        newLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const errorDiv = document.getElementById('login-error');
            
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    // Previne erro caso data.user não exista (API pode retornar estrutura plana)
                    const user = data.user || data;

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', user.role || '');
                    localStorage.setItem('nome', user.nome || '');
                    localStorage.setItem('userId', user.id || '');
                    window.location.href = '/dashboard';
                } else {
                    throw new Error(data.error || 'Erro ao fazer login');
                }
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            }
        });
    }
};