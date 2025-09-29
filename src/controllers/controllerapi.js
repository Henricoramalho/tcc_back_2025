const express = require("express");
const fetch = require("node-fetch"); // Se estiver usando Node >=18, pode remover e usar fetch direto
require("dotenv").config();

const router = express.Router();

router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Informe o termo de busca (q)" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

module.exports = router;
