// Verifica login
if(sessionStorage.getItem('loggedIn') !== 'true') {
  alert("❌ Você precisa estar logado.");
  window.location.href = "../index.html";
} else {
  document.getElementById('userEmail').textContent = 
    "Você está logado como: " + sessionStorage.getItem('userEmail');
}
