// ------------------------------
// Base URL dinâmica
// ------------------------------
const repoName = 'ws-gestao';
const isGitLab = window.location.hostname.includes('gitlab.io');
const baseURL = isGitLab ? `/${repoName}/` : '/';

// ------------------------------
// Mostra email do usuário logado
// ------------------------------
const userEmail = sessionStorage.getItem('userEmail');
if(!userEmail){
  window.location.href = `${baseURL}index.html`; // redireciona para login
} else {
  document.getElementById('userEmail').innerText = userEmail;
}

// ------------------------------
// Logout
// ------------------------------
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = `${baseURL}index.html`;
});
