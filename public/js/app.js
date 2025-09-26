document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const adminEmail = "admin@wsgestao.com";
  const adminPassword = "1234";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("❌ Email inválido. Verifique o formato.");
    return;
  }

  if(email === adminEmail && password === adminPassword) {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userEmail', email);

    alert("✅ Login realizado com sucesso!");
    window.location.href = "pages/dashboard.html";
  } else {
    alert("❌ Email ou senha inválidos.");
  }
});
