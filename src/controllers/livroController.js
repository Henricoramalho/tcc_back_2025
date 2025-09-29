const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async getAll(req, res) {
    const livros = await prisma.livro.findMany();
    res.json(livros);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const livro = await prisma.livro.findUnique({ where: { id: parseInt(id) } });
    livro ? res.json(livro) : res.status(404).json({ error: 'Livro não encontrado' });
  },

  async create(req, res) {
    const data = req.body;
    const novoLivro = await prisma.livro.create({ data });
    res.status(201).json(novoLivro);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const livroAtualizado = await prisma.livro.update({ where: { id: parseInt(id) }, data });
      res.json(livroAtualizado);
    } catch {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.livro.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch {
      res.status(404).json({ error: 'Livro não encontrado' });
    }
  }
};
