// Verifica se o usuário está logado
if(sessionStorage.getItem('loggedIn') !== 'true') {
  alert("❌ Você precisa fazer login primeiro!");
  window.location.href = "../index.html";
} else {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmailDisplay').innerText = `Você está logado como: ${userEmail}`;
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
  sessionStorage.clear();
});
