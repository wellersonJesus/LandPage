// Base URL dinâmica
const isGitLab = window.location.hostname.includes('gitlab.io');
const baseURL = isGitLab ? '/' : './';

// Mostra email do usuário logado
const userEmail = sessionStorage.getItem('userEmail');
if(!userEmail){
  window.location.href = `${baseURL}index.html`;
} else {
  document.getElementById('userEmail').innerText = userEmail;
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = `${baseURL}index.html`;
});
