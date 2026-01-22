import { routes } from './src/Routers/appRoutes.js';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;

    // Lógica de Roteamento e Proteção de Rotas
    if (path.startsWith('/dashboard')) {
        // Se o usuário tenta acessar o dashboard sem estar logado...
        if (!token) {
            window.location.href = '/'; // ...redireciona para a página inicial.
            return;
        }
        // Se estiver logado, inicializa o controller do dashboard.
        if (routes['/dashboard']) {
            routes['/dashboard'].init();
        }
    } else { // Para a rota raiz '/' e qualquer outra.
        // Se o usuário está na página inicial mas já tem um token...
        if (token) {
            window.location.href = '/dashboard'; // ...redireciona para o dashboard.
            return;
        }
        // Se não estiver logado, inicializa o controller da página inicial (com o modal de login).
        if (routes['/']) {
            routes['/'].init();
        }
    }

    // Expõe a função de logout globalmente para ser acessível pelo 'onclick' no HTML.
    window.logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/'; // Redireciona para a página inicial após o logout.
    };
}