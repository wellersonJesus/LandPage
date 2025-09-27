// ------------------------------
// Base URL dinâmica
// ------------------------------
const repoName = 'ws-gestao';
const isGitLab = window.location.hostname.includes('gitlab.io');
const baseURL = isGitLab ? `/${repoName}/` : './';

// ------------------------------
// Mostra email do usuário logado
// ------------------------------
const userEmail = sessionStorage.getItem('userEmail');
if(!userEmail){
  window.location.href = `${baseURL}index.html`;
} else {
  const emailElem = document.getElementById('userEmail');
  if(emailElem) emailElem.innerText = userEmail;
}

// ------------------------------
// Logout
// ------------------------------
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = `${baseURL}index.html`;
  });
}
