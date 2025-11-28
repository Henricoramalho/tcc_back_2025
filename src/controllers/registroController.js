const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Listar todos os registros
  async getAll(req, res) {
    try {
      const registros = await prisma.registro.findMany({
        include: {
          livro: true,
          usuario: true
        }
      });
      res.json(registros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar registros' });
    }
  },

  // Buscar um registro por ID
  async getOne(req, res) {
    const { id } = req.params;

    try {
      const registro = await prisma.registro.findUnique({
        where: { id: Number(id) },
        include: {
          livro: true,
          usuario: true
        }
      });

      if (!registro) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }

      res.json(registro);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar registro' });
    }
  },

  // Criar um registro
  async create(req, res) {
    try {
      const data = req.body;
      const novoRegistro = await prisma.registro.create({ data });

      res.status(201).json(novoRegistro);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar registro', details: error.message });
    }
  },

  // Atualizar um registro
  async update(req, res) {
    const { id } = req.params;

    try {
      const data = req.body;
      const registroAtualizado = await prisma.registro.update({
        where: { id: Number(id) },
        data
      });

      res.json(registroAtualizado);
    } catch (error) {
      res.status(404).json({ error: 'Registro não encontrado' });
    }
  },

  // Remover um registro
  async remove(req, res) {
    const { id } = req.params;

    try {
      await prisma.registro.delete({
        where: { id: Number(id) }
      });

      res.status(204).send(); // Sem conteúdo, mas sucesso
    } catch (error) {
      res.status(404).json({ error: 'Registro não encontrado' });
    }
  }
};
