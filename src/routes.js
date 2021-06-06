require("dotenv").config();

const express  = require ('express');
const routes = express.Router();
const Contact = require('../Controllers/ContactController')
const User = require('../Controllers/UserController')
const Email = require('../Controllers/EmailController')


routes.get('/',User.index);

// Rotas de Contatos
routes.post('/api/contacts', Contact.create)
routes.get('/api/contacts',Contact.index)
routes.get('/api/contacts.details/:_id',Contact.details);
routes.delete('/api/contacts/:_id',Contact.delete);
routes.put('/api/contacts',Contact.update);

// Rotas de Usuários
routes.post('/api/usuarios',User.create);
routes.get('/api/usuarios',User.index);
routes.get('/api/usuarios.details/:_id',User.details);
routes.delete('/api/usuarios/:_id',User.delete);
routes.put('/api/usuarios',User.update);

// Rota de Login 
routes.post('/api/usuarios/login',User.login);
routes.get('/api/usuarios/checktoken',User.checkToken);
routes.get('/api/usuarios/destroytoken',User.destroyToken);
module.exports = routes;