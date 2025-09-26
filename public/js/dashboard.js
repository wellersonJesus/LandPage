// dashboard.js

document.addEventListener("DOMContentLoaded", function () {

  // 🔹 Simulação: verificar se usuário está logado
  // Aqui poderíamos pegar info de sessionStorage/localStorage futuramente
  const userEmail = "admin@gmail.com"; // email de teste
  const userDisplay = document.getElementById("user-email");

  if (userDisplay) {
    userDisplay.textContent = userEmail;
  }

  // 🔹 Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Aqui futuramente limpar session/local storage
      alert("✅ Logout realizado com sucesso!");
      window.location.href = "../index.html"; // Caminho relativo para login
    });
  }

  // 🔹 Exemplo de interação: botão de alerta
  const alertBtn = document.getElementById("alertBtn");
  if (alertBtn) {
    alertBtn.addEventListener("click", function () {
      alert("🎉 Exemplo de ação no dashboard!");
    });
  }

  // 🔹 Exemplo de atualização de dados dinâmicos (mock)
  const statsContainer = document.getElementById("stats-container");
  if (statsContainer) {
    statsContainer.innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Visitas hoje: <strong>12</strong></li>
        <li class="list-group-item">Usuários ativos: <strong>5</strong></li>
        <li class="list-group-item">Novos cadastros: <strong>2</strong></li>
      </ul>
    `;
  }

});
