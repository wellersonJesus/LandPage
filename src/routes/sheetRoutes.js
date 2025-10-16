import express from "express";
import { getData, createRow, updateRow, deleteRow } from "../controllers/sheetController.js";

const router = express.Router();

// CRUD completo
router.get("/", getData);
router.post("/", createRow);
router.patch("/:lineNumber", updateRow);
router.delete("/:lineNumber", deleteRow);

export default router;
