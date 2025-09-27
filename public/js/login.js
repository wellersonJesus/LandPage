document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleBtn = document.querySelector('.btn-outline-danger'); // Botão Google

  if (!loginForm) {
    console.error("❌ Formulário de login não encontrado.");
    return;
  }

  // Função para carregar credenciais do JSON
  async function loadCredentials() {
    try {
      const response = await fetch('./credentials/keys.json');
      if (!response.ok) throw new Error("Não foi possível carregar o arquivo de credenciais");
      return await response.json();
    } catch (err) {
      alert("❌ Erro ao carregar credenciais. Tente novamente.");
      console.error(err);
      return null;
    }
  }

  // Login admin (local)
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("❌ Email inválido.");
      return;
    }

    const credentials = await loadCredentials();
    if (!credentials) return;

    const { admin } = credentials;

    if (email === admin.email && password === admin.password) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "pages/dashboard.html";
    } else {
      alert("❌ Email ou senha inválidos.");
    }
  });

  // Configuração Firebase (Google Login)
  (async () => {
    const credentials = await loadCredentials();
    if (!credentials) return;
    const { firebase } = credentials;

    // Inicializa Firebase
    const app = firebaseInitializeApp(firebase);
    const auth = firebaseGetAuth(app);

    googleBtn.addEventListener('click', async () => {
      const provider = new firebase.GoogleAuthProvider();
      try {
        const result = await firebaseSignInWithPopup(auth, provider);
        const user = result.user;
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('userEmail', user.email);
        alert(`✅ Login Google realizado com sucesso!\nBem-vindo ${user.displayName}`);
        window.location.href = "pages/dashboard.html";
      } catch (err) {
        console.error(err);
        alert("❌ Falha no login Google. Tente novamente.");
      }
    });
  })();

  // Funções auxiliares para Firebase (para compatibilidade ES Modules)
  function firebaseInitializeApp(config) {
    return firebase.initializeApp(config);
  }

  function firebaseGetAuth(app) {
    return firebase.auth();
  }

  function firebaseSignInWithPopup(auth, provider) {
    return auth.signInWithPopup(provider);
  }

  firebase.GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
});
