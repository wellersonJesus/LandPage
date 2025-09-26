// Mostra o email do usuário logado
const userEmail = sessionStorage.getItem('userEmail');
if (userEmail) {
  document.getElementById('userEmail').innerText = userEmail;
} else {
  // Se não estiver logado, volta para login
  window.location.href = "../index.html";
}
