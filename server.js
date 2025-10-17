import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/routes/authRoutes.js";
import sheetRoutes from "./src/routes/sheetRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos (CSS, JS, imagens)
app.use("/src", express.static(path.join(__dirname, "src")));
app.use("/pages", express.static(path.join(__dirname, "pages")));

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);

// Rotas de páginas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages/login/login.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "pages/dashboard/dashboard.html")));

app.listen(PORT, () => {
  console.log(`🌍 Servidor rodando em http://localhost:${PORT}`);
});
