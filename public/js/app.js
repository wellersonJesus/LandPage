document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validação básica do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Email inválido. Verifique o formato e tente novamente.");
      return;
    }

    // Para evitar erro de fetch com file://, carregue credenciais no JS
    // para desenvolvimento local ou GitLab Pages, sem expor publicamente
    const credentials = {
      adminEmail: "admin@wsgestao.com",
      adminPassword: "1234"
    };

    // Validação de login
    if (email === credentials.adminEmail && password === credentials.adminPassword) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "../pages/dashboard.html";
    } else {
      alert("❌ Email ou senha inválidos.");
    }
  });
});
