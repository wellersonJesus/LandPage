import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Servir arquivos estáticos
app.use("/src", express.static(path.join(__dirname, "src")));
app.use("/pages/login", express.static(path.join(__dirname, "pages/login")));
app.use("/pages/dashboard", express.static(path.join(__dirname, "pages/dashboard")));

// 🔐 Login tradicional
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (
    (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) ||
    (email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD)
  ) {
    const token = Buffer.from(`${email}:${process.env.APP_SECRET}`).toString("base64");
    return res.json({ token, email });
  }

  return res.status(401).json({ error: "Credenciais inválidas" });
});

// 🔐 Login simulado Google
app.get("/api/auth/google", (req, res) => {
  // Aqui você pode usar o admin ou user do seu .env
  const email = process.env.USER_EMAIL;
  const token = Buffer.from(`${email}:${process.env.APP_SECRET}`).toString("base64");

  res.json({ email, token });
});

// 🔐 Login simulado Instagram
app.get("/api/auth/instagram", (req, res) => {
  const email = process.env.USER_EMAIL;
  const token = Buffer.from(`${email}:${process.env.APP_SECRET}`).toString("base64");

  res.json({ email, token });
});

// ✅ Rotas HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/login/login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/dashboard/dashboard.html"));
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
