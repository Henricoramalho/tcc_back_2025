const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      // Buscar usuário pelo email
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });

      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verificar senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { 
          id: usuario.id, 
          email: usuario.email, 
          tipo: usuario.tipo 
        },
        process.env.JWT_SECRET || 'seuSegredoJWT',
        { expiresIn: '24h' }
      );

      // Remover senha do retorno
      const { senha: _, ...usuarioSemSenha } = usuario;

      res.json({
        token,
        usuario: usuarioSemSenha
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};