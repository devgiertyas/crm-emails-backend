require("dotenv").config();

const express  = require ('express');
const routes = express.Router();
const Contact = require('../Controllers/ContactController')
const User = require('../Controllers/UserController')
const Email = require('../Controllers/EmailController')
const Group = require('../Controllers/GroupController')


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

// Rota e Grupo
routes.post('/api/grupos',Group.create);
routes.get('/api/grupos',Group.index);
routes.delete('/api/grupos/:_id',Group.delete);
routes.get('/api/grupos.details/:_id',Group.details);
routes.put('/api/grupos/removercontato/:_id',Group.deletecontact);


// Rota de Login 
routes.post('/api/usuarios/login',User.login);
routes.get('/api/usuarios/checktoken',User.checkToken);
routes.get('/api/usuarios/destroytoken',User.destroyToken);


module.exports = routes;