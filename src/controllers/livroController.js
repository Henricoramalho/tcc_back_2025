const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const {
      titulo,
      autor,
      isbn,
      editora,
      anoPublicacao,
      genero,
      sinopse,
      paginas,
      idioma,
    } = req.body;

    if (!titulo || !autor || !isbn) {
      return res
        .status(400)
        .json({ erro: "Título, autor e ISBN são obrigatórios." });
    }

    const livroExistente = await prisma.livro.findUnique({
      where: { isbn },
    });

    if (livroExistente) {
      return res.status(200).json({
        mensagem: "Livro já cadastrado.",
        livro: livroExistente,
      });
    }

    const novoLivro = await prisma.livro.create({
      data: {
        titulo,
        autor,
        isbn,
        editora,
        anoPublicacao,
        genero,
        sinopse,
        paginas,
        idioma,
      },
    });

    return res.status(201).json(novoLivro);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao cadastrar livro." });
  }
};

const read = async (req, res) => {
  try {
    const livros = await prisma.livro.findMany({
      orderBy: { dataCadastro: "desc" },
    });

    return res.status(200).json(livros);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao listar livros." });
  }
};

const readOne = async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await prisma.livro.findUnique({
      where: { id: Number(id) },
    });

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    return res.status(200).json(livro);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao buscar livro." });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      autor,
      isbn,
      editora,
      anoPublicacao,
      genero,
      sinopse,
      paginas,
      idioma,
    } = req.body;

    const livroExistente = await prisma.livro.findUnique({
      where: { id: Number(id) },
    });

    if (!livroExistente) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    const livroAtualizado = await prisma.livro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        autor,
        isbn,
        editora,
        anoPublicacao,
        genero,
        sinopse,
        paginas,
        idioma,
      },
    });

    return res.status(200).json(livroAtualizado);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao atualizar livro." });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const livroExistente = await prisma.livro.findUnique({
      where: { id: Number(id) },
    });

    if (!livroExistente) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    // 1. Remover registros que dependem do livro
    await prisma.registro.deleteMany({
      where: { livroId: Number(id) }
    });

    // 2. Remover o livro
    await prisma.livro.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ mensagem: "Livro deletado com sucesso." });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao deletar livro." });
  }
};
