import express from "express";
import { login, loginGoogle } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);       // POST /api/auth/login
router.get("/google", loginGoogle); // GET /api/auth/google

export default router;
