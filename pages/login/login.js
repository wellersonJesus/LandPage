const loginForm = document.getElementById("loginForm");
const googleBtn = document.getElementById("googleLogin");
const instagramBtn = document.getElementById("instagramLogin");

// Login tradicional
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Credenciais inválidas");

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("loggedUser", JSON.stringify({ email: data.email }));
    window.location.href = "/dashboard";
  } catch (err) {
    alert("❌ " + err.message);
  }
});

// Login Google
googleBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/auth/google");
    if (!res.ok) throw new Error("Erro no login Google");

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("loggedUser", JSON.stringify({ email: data.email }));
    window.location.href = "/dashboard";
  } catch (err) {
    alert("❌ " + err.message);
  }
});

// Login Instagram
instagramBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/api/auth/instagram");
    if (!res.ok) throw new Error("Erro no login Instagram");

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("loggedUser", JSON.stringify({ email: data.email }));
    window.location.href = "/dashboard";
  } catch (err) {
    alert("❌ " + err.message);
  }
});
