const express = require('express');
const routes = express.Router();

// Controllers
const livroController = require('./controllers/livroController');
const usuarioController = require('./controllers/usuarioController');
const registroController = require('./controllers/registroController');
// const booksRouter = require('./controllers/controllerapi');
const authController = require('./controllers/authController');

// Middlewares
const validateUser = require('./middlewares/validateUser');
const autenticarToken = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin');

// Rota raiz (teste)
routes.get('/', (req, res) => {
  return res.json({
    titulo: 'Biblioteca Virtual', version: '1.0.0',
    rotas: [
      {
        metodo: 'GET',
        rota: '/livros',
        descricao: 'Lista todos os livros'
      },
      {
        metodo: 'GET',
        rota: '/livros/:id',
        descricao: 'Lista um livro pelo ID'
      },
      {
        metodo: 'POST',
        rota: '/livros',
        descricao: 'Cria um novo livro (admin)'
      },
      {
        metodo: 'PUT',
        rota: '/livros/:id',
        descricao: 'Atualiza um livro pelo ID (admin)'
      },
      {
        metodo: 'DELETE',
        rota: '/livros/:id',
        descricao: 'Remove um livro pelo ID (admin)'
      },
      {
        metodo: 'POST',
        rota: '/usuarios',
        descricao: 'Cadastra um novo usuário'
      },
      {
        metodo: 'POST',
        rota: '/auth/login',
        descricao: 'Login do usuário'
      },
      {
        metodo: 'GET',
        rota: '/registros',
        descricao: 'Lista todos os registros (admin)'
      },
      {
        metodo: 'POST',
        rota: '/registros',
        descricao: 'Cria um novo registro (usuário autenticado)'
      }
    ]
  });
});

// ------------------- LIVROS -------------------
routes.get('/livros', livroController.getAll);
routes.get('/livros/:id', livroController.getOne);

// Só admin pode criar, atualizar e remover livros
routes.post('/livros', autenticarToken, isAdmin, livroController.create);
routes.put('/livros/:id', autenticarToken, isAdmin, livroController.update);
routes.delete('/livros/:id', autenticarToken, isAdmin, livroController.remove);

// ------------------- USUÁRIOS -------------------
routes.get('/usuarios', autenticarToken, isAdmin, usuarioController.getAll);
routes.get('/usuarios/:id', autenticarToken, isAdmin, usuarioController.getOne);

// Usuário se cadastra com validação
routes.post('/usuarios', validateUser, usuarioController.create);

// Somente admin pode editar ou remover usuários
routes.put('/usuarios/:id', autenticarToken, isAdmin, usuarioController.update);
routes.delete('/usuarios/:id', autenticarToken, isAdmin, usuarioController.remove);

// ------------------- REGISTROS -------------------
routes.get('/registros', registroController.getAll);
routes.get('/registros/:id', autenticarToken, registroController.getOne);

// Criar registro precisa de login
routes.post('/registros', registroController.create);

// Atualizar e remover só admin
routes.put('/registros/:id', autenticarToken, isAdmin, registroController.update);
routes.delete('/registros/:id', autenticarToken, isAdmin, registroController.remove);

routes.post('/auth/login', authController.login);

// ------------------- GOOGLE BOOKS API -------------------
// routes.use('/books', booksRouter);



module.exports = routes;
