// Função de redirecionamento dinâmico
const redirectToLogin = () => {
  if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    window.location.href = "http://127.0.0.1:8080/index.html";
  } else {
    window.location.href = "/ws-gestao/index.html";
  }
};

// Mostra email do usuário logado
const userEmail = sessionStorage.getItem('userEmail');

if (userEmail) {
  const userEmailEl = document.getElementById('userEmail');
  if (userEmailEl) userEmailEl.innerText = userEmail;
} else {
  // Não logado → volta para login
  redirectToLogin();
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    redirectToLogin();
  });
}
