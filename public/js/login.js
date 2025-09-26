document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Carrega credenciais do JSON
    let credentials;
    try {
      const response = await fetch('../credentials/keys.json');
      credentials = await response.json();
    } catch (err) {
      alert("❌ Erro ao carregar credenciais. Tente novamente.");
      console.error(err);
      return;
    }

    const { adminEmail, adminPassword } = credentials;

    // Valida formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Email inválido. Verifique o formato e tente novamente.");
      return;
    }

    // Validação de login
    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userEmail', email);

      alert("✅ Login realizado com sucesso!");
      window.location.href = "pages/dashboard.html"; // Redireciona
    } else {
      alert("❌ Email ou senha inválidos.");
    }
  });
});
