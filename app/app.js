import { routes } from './src/Routers/appRoutes.js';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;
    
    // Elementos globais de navegação
    const navbar = document.getElementById('navbar');
    const landingPage = document.getElementById('landing-page');
    const dashboardSection = document.getElementById('dashboard-section');

    // Roteamento simples baseado em Auth
    if (token) {
        // Usuário Logado
        landingPage.style.display = 'none';
        dashboardSection.style.display = 'block';
        navbar.style.display = 'block';
        
        // Carrega o controller da Dashboard
        if (routes['/dashboard']) {
            routes['/dashboard'].init();
        }
    } else {
        // Usuário Não Logado (Landing Page)
        landingPage.style.display = 'block';
        dashboardSection.style.display = 'none';
        navbar.style.display = 'block'; // Navbar visível na landing page
        
        // Inicializa o controller de Login (que gerencia o Modal)
        if (routes['/']) {
            routes['/'].init();
        }
    }
    
    // Expor logout globalmente para o botão do HTML funcionar
    window.logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload();
    };
}