// src/app/router.js
export const Router = (() => {
  const routes = {};

  // Detecta se está rodando no GitLab Pages
  const isGitLab = window.location.hostname.includes('gitlab.io');
  const repoName = 'ws-gestao';
  const baseURL = isGitLab ? `/${repoName}/` : './';

  /**
   * Adiciona uma rota
   * @param {string} path Caminho da rota relativo ao baseURL
   * @param {Function} callback Função executada ao navegar para a rota
   */
  const addRoute = (path, callback) => {
    routes[path] = callback;
  };

  /**
   * Navega para a rota especificada
   * @param {string} path Caminho da rota
   */
  const navigate = (path) => {
    const fullPath = baseURL + path;

    if (routes[path]) {
      routes[path]();
      window.history.pushState({}, '', fullPath);
    } else {
      console.warn(`❌ Rota não encontrada: ${path}. Redirecionando...`);
      window.location.href = fullPath;
    }
  };

  /**
   * Inicializa listeners de navegação (back/forward)
   */
  const init = () => {
    window.addEventListener('popstate', () => {
      const currentPath = window.location.pathname.replace(baseURL, '');
      if (routes[currentPath]) routes[currentPath]();
    });
  };

  return {
    init,
    addRoute,
    navigate,
  };
})();
