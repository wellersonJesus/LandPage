// ------------------------------
// Base URL dinâmica
// ------------------------------
const isGitLab = window.location.hostname.includes('gitlab.io');
const repoName = isGitLab ? window.location.pathname.split('/')[1] : '';
const baseURL = isGitLab ? `/${repoName}/` : '/';

// ------------------------------
// Redirecionamentos
// ------------------------------
const redirectToHome = () => window.location.href = `${baseURL}index.html`;

// ------------------------------
// Verificação de sessão
// ------------------------------
const userEmail = sessionStorage.getItem('userEmail');
if (!userEmail) {
  redirectToHome(); // não logado → volta para login
} else {
  const userEmailElem = document.getElementById('userEmail');
  if (userEmailElem) userEmailElem.innerText = userEmail;
}

// ------------------------------
// Logout
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      redirectToHome(); // volta para index.html correto
    });
  }
});
