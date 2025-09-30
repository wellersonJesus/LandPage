// ------------------------------
// Base URL dinâmica
// ------------------------------
const isGitLab = window.location.hostname.includes("gitlab.io");
const pathParts = window.location.pathname.split("/").filter(Boolean);
const repoName = isGitLab && pathParts.length > 0 ? pathParts[0] : "";
const baseURL = isGitLab ? `/${repoName}/pages/` : "../pages/";

// ------------------------------
// Função de redirecionamento
// ------------------------------
const goToLogin = () => {
  window.location.href = `${baseURL}index.html`;
};

// ------------------------------
// Verifica sessão
// ------------------------------
const userEmail = sessionStorage.getItem("userEmail");
if (!userEmail) {
  goToLogin();
} else {
  const userEmailElem = document.getElementById("userEmail");
  if (userEmailElem) userEmailElem.innerText = userEmail;
}

// ------------------------------
// Logout
// ------------------------------
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    goToLogin();
  });
}
