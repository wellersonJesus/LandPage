import fetch from "node-fetch"; // se usar Node >=18, fetch já existe nativamente
import { ZeroSheetsConfig } from "../config/zerosheets.js";

export const getData = async (req, res) => {
  try {
    const response = await fetch(ZeroSheetsConfig.url, {
      headers: { Authorization: `Bearer ${ZeroSheetsConfig.token}` },
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
};

export const createRow = async (req, res) => {
  try {
    const response = await fetch(ZeroSheetsConfig.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ZeroSheetsConfig.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar registro" });
  }
};

export const updateRow = async (req, res) => {
  try {
    const { lineNumber } = req.params;
    const response = await fetch(`${ZeroSheetsConfig.url}/${lineNumber}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${ZeroSheetsConfig.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar registro" });
  }
};

export const deleteRow = async (req, res) => {
  try {
    const { lineNumber } = req.params;
    await fetch(`${ZeroSheetsConfig.url}/${lineNumber}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${ZeroSheetsConfig.token}` }
    });
    res.json({ message: "Registro deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar registro" });
  }
};
