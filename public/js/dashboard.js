// ------------------------------
// Mostra email do usuário logado
// ------------------------------
const userEmail = sessionStorage.getItem('userEmail');

if(!userEmail){
  // REDIRECIONA PARA LOGIN
  if(window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'){
    window.location.href = '../index.html';
  } else {
    window.location.href = '/ws-gestao/index.html';
  }
} else {
  const emailEl = document.getElementById('userEmail');
  if(emailEl) emailEl.innerText = userEmail;
}

// ------------------------------
// Logout
// ------------------------------
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    if(window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'){
      window.location.href = '../index.html';
    } else {
      window.location.href = '/ws-gestao/index.html';
    }
  });
}
