const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async getAll(req, res) {
    const registros = await prisma.registro.findMany({
      include: {
        livro: true,
        usuario: true
      }
    });
    res.json(registros);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const registro = await prisma.registro.findUnique({
      where: { id: parseInt(id) },
      include: {
        livro: true,
        usuario: true
      }
    });
    registro ? res.json(registro) : res.status(404).json({ error: 'Registro não encontrado' });
  },

  async create(req, res) {
    const data = req.body;
    const novoRegistro = await prisma.registro.create({ data });
    res.status(201).json(novoRegistro);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const registroAtualizado = await prisma.registro.update({ where: { id: parseInt(id) }, data });
      res.json(registroAtualizado);
    } catch {
      res.status(404).json({ error: 'Registro não encontrado' });
    }
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.registro.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch {
      res.status(404).json({ error: 'Registro não encontrado' });
    }
  }
};
