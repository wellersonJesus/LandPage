// Base URL dinâmica
const isGitLab = window.location.hostname.includes('gitlab.io');
const repoName = isGitLab ? window.location.pathname.split('/')[1] : '';
const baseIndex = isGitLab ? `/${repoName}/index.html` : "../index.html";

// Mostra email do usuário logado
const userEmail = sessionStorage.getItem('userEmail');
if(!userEmail){
  window.location.href = baseIndex;
} else {
  const emailEl = document.getElementById('userEmail');
  if(emailEl) emailEl.innerText = userEmail;
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = baseIndex;
  });
}
