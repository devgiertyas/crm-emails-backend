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

// Rotas de Usuários
routes.post('/api/usuarios',User.create);
routes.get('/api/usuario',User.index);
routes.get('/api/usuarios.details/:_id',User.details);
routes.delete('/api/usuarios/:_id',User.delete);
routes.put('/api/usuarios',User.update);

module.exports = routes;