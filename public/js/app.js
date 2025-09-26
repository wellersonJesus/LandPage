document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // 🔹 Credenciais de teste
  const adminEmail = "admin@wsgestao.com";
  const adminPassword = "1234";

  // Função simples para validar formato de email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  if (!isValidEmail(email)) {
    alert("❌ Email inválido. Verifique o formato e tente novamente.");
    return;
  }

  if(email === adminEmail && password === adminPassword) {
    // Salva login no sessionStorage
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userEmail', email);

    alert("✅ Login realizado com sucesso!");
    window.location.href = "pages/dashboard.html"; // caminho relativo
  } else {
    alert("❌ Email ou senha inválidos.");
  }
});
