const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async getAll(req, res) {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  },

  async getOne(req, res) {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(id) } });
    usuario ? res.json(usuario) : res.status(404).json({ error: 'Usuário não encontrado' });
  },

  async create(req, res) {
    const data = req.body;
    const novoUsuario = await prisma.usuario.create({ data });
    res.status(201).json(novoUsuario);
  },

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const usuarioAtualizado = await prisma.usuario.update({ where: { id: parseInt(id) }, data });
      res.json(usuarioAtualizado);
    } catch {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      await prisma.usuario.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  }
};
