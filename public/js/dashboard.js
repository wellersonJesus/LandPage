// ------------------------------
// Base URL dinâmica
// ------------------------------
const isGitLab = window.location.hostname.includes("gitlab.io");
const repoName = isGitLab ? window.location.pathname.split("/")[1] : "";
const baseURL = isGitLab
  ? `/${repoName}/` // GitLab Pages: raiz do repositório
  : "/";            // Localhost: raiz do servidor

// ------------------------------
// Função de redirecionamento seguro
// ------------------------------
const goToLogin = () => {
  window.location.href = `${baseURL}index.html`;
};

// ------------------------------
// Verifica se está logado
// ------------------------------
const userEmail = sessionStorage.getItem("userEmail");

if (!userEmail) {
  goToLogin();
} else {
  const userEmailElem = document.getElementById("userEmail");
  if (userEmailElem) {
    userEmailElem.innerText = userEmail;
  }
}

// ------------------------------
// Logout
// ------------------------------
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.clear(); // limpa sessão
    goToLogin();            // volta pro login certo
  });
}
