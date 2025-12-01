const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


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
    try {
      const { nome, email, senha } = req.body;

      const hash = await bcrypt.hash(senha, 10);

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hash
        }
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
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
