document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!loginForm) {
    console.error("❌ Formulário de login não encontrado.");
    return;
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validação básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Email inválido.");
      return;
    }

    // Credenciais fixas
    const credentials = {
      adminEmail: "admin@wsgestao.com",
      adminPassword: "1234"
    };

    if (email === credentials.adminEmail && password === credentials.adminPassword) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "pages/dashboard.html";
    } else {
      alert("❌ Email ou senha inválidos.");
    }
  });
});
