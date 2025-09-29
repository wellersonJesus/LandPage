// ------------------------------
// Base URL dinâmica
// ------------------------------
const isGitLab = window.location.hostname.includes('gitlab.io');
const repoName = isGitLab ? window.location.pathname.split('/')[1] : '';
const baseURL = isGitLab ? `/${repoName}/` : './';

// Mostra email do usuário logado
const userEmail = sessionStorage.getItem('userEmail');

if (!userEmail) {
  // Redireciona corretamente para login, independente do ambiente
  window.location.href = `${baseURL}index.html`;
} else {
  const userEmailElem = document.getElementById('userEmail');
  if (userEmailElem) userEmailElem.innerText = userEmail;
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    // Retorna para login corretamente
    window.location.href = `${baseURL}index.html`;
  });
}
