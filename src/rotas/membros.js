const express = require("express");

const router = express.Router();

// ─── Tarefa B — Membros ───────────────────────────────────────────────────────
// Armazenamento EM MEMÓRIA (não use banco de dados neste trabalho).
const membros = [];
let proximoId = 1;

// GET /membros — lista todos os membros cadastrados.
router.get("/", (req, res) => {
  res.status(200).json(membros);
});

// POST /membros — cadastra um membro { nome, matricula } (ambos TEXTO/string).
router.post("/", (req, res) => {
  const { nome, matricula } = req.body;

  if (
    typeof nome !== "string" ||
    nome.trim() === "" ||
    typeof matricula !== "string" ||
    matricula.trim() === ""
  ) {
    return res.status(400).json({ erro: "nome e matricula são obrigatórios" });
  }

  const membro = { id: proximoId++, nome, matricula };
  membros.push(membro);

  res.status(201).json(membro);
});

module.exports = router;
