import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  const isAdmin =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;
  const isUser =
    email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD;

  if (!isAdmin && !isUser) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const role = isAdmin ? "admin" : "user";
  const token = jwt.sign({ email, role }, process.env.APP_SECRET, {
    expiresIn: "2h",
  });

  res.json({ message: "Login bem-sucedido", token, role });
};
