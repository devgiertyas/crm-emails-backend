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
  },
  async details(req,res){
    const {_id} = req.params;
    const contact = await Contact.findOne({_id});
    res.json(contact);
},
async delete(req,res){
    const { _id } = req.params;
    const contact = await Contact.findByIdAndDelete({_id});
    return res.json(contact);
},
async update(req,res){
    const { _id, nome_contato, email_contato, telefone_contato } = req.body;
    const data = {nome_contato, email_contato, telefone_contato};
    const contact = await Contact.findOneAndUpdate({_id},data,{new:true});
    res.json(contact);
},  
}