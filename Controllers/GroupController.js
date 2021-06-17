const { json } = require('express');
const Group = require('../Models/GroupModel');
const Contato = require('../Models/ContactModel')

module.exports = {
    async index(req,res){
        const group = await Group.find().populate('contacts');
        res.json(group);
    },
  async create(req, res){
    try {
    const {nome_grupo, contatos } = req.body;

    const grupo = await Group.create({nome_grupo:nome_grupo, contacts: contatos});
  
    return res.status(200).json(grupo);
    }
    catch(err){
      console.log(err);
    }
  },  
  async delete(req, res) {
    const { _id } = req.params;
    const grupo = await Group.findByIdAndDelete({ _id });
    return res.json(grupo);
},  
}