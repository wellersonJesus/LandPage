document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Valida formato de email antes de buscar credenciais
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Email inválido. Verifique o formato e tente novamente.");
      return;
    }

    // Carrega credenciais do arquivo JSON
    let credentials;
    try {
      const response = await fetch('./credentials/keys.json');
      if (!response.ok) throw new Error("Não foi possível carregar o arquivo de credenciais");
      credentials = await response.json();
    } catch (err) {
      alert("❌ Erro ao carregar credenciais. Tente novamente.");
      console.error(err);
      return;
    }

    const { adminEmail, adminPassword } = credentials;

    // Validação de login
    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userEmail', email);

      alert("✅ Login realizado com sucesso!");
      window.location.href = "pages/dashboard.html";
    } else {
      alert("❌ Email ou senha inválidos.");
    }
  });
});
