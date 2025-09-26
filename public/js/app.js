document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // 🔹 Credenciais de teste
  const adminEmail = "admin@gmail.com";
  const adminPassword = "1234";

  if (email === adminEmail && password === adminPassword) {
    alert("✅ Login realizado com sucesso!");
    window.location.href = "dashboard.html"; // Redireciona para o dashboard
  } else {
    alert("❌ Email ou senha inválidos.");
  }
});
