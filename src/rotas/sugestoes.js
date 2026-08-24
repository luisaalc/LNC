const express = require("express");

const router = express.Router();

// ─── Tarefa C — Sugestões de compra + votação ─────────────────────────────────
// Armazenamento EM MEMÓRIA (não use banco de dados neste trabalho).
const sugestoes = [];
let proximoId = 1;

// GET /sugestoes — lista as sugestões, cada uma como { id, titulo, votos }.
router.get("/", (req, res) => {
  res.status(200).json(sugestoes);
});

// POST /sugestoes — corpo { titulo } (texto) → 201 com { id, titulo, votos: 0 }; 400 se faltar titulo.
router.post("/", (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: "título é obrigatório" });
  }

  const sugestao = {
    id: proximoId++,
    titulo: titulo,
    votos: 0,
  };

  sugestoes.push(sugestao); // Adiciona a nova sugestão ao array

  res.status(201).json(sugestao);
});

// POST /sugestoes/voto — corpo { id } → 200 (incrementa os votos); 400 se o id não existir.
router.post("/voto", (req, res) => {
  const { id } = req.body;

  const sugestao = sugestoes.find((s) => s.id === id);

  if (!sugestao) {
    return res.status(400).json({ erro: "sugestão não encontrada" });
  }

  sugestao.votos += 1; // Incrementa a contagem de votos

  res.status(200).json(sugestao);
});

module.exports = router;