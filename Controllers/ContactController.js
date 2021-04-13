const { json } = require('express');
const Contact = require('../Models/ContactModel');

module.exports = {
    async index(req,res){
        const contact = await Contact.find();
        res.json(contact);
    },
  async create(req, res){
      const {nome_contato, email_contato, telefone_contato} = req.body;

      let data = {}

      let contact = await Contact.findOne({email_contato})

        if(!contact)
        {
            data = {nome_contato, email_contato, telefone_contato}
            contact = await Contact.create(data);
            return res.status(200).json(contact);
        }
        else  
        {
          return res.status(500).json(contact);
        }

  }
}