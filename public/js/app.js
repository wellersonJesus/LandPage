document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // 🔹 Simulação de login (mais tarde pode integrar ZeroSheets)
    if(email === "admin@teste.com" && password === "1234") {
      alert("Login realizado com sucesso!");
      window.location.href = "dashboard.html"; // redireciona para o dashboard
    } else {
      alert("Email ou senha inválidos.");
    }
  });
  