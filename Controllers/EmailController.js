const { json } = require('express');
const sgMail = require('@sendgrid/mail');
const Email = require('../Models/EmailModel');

require('dotenv').config({ path: '../../sendgrid.env' })

module.exports = {
async SendEmail(req, res) {
  try {

    console.log(req.body)
    const data = req.body;
  
    const to = []
   for (let index = 0; index < data.remetentes.length; index++) {
      
      to.push(data.remetentes[index].email_contato)
    }

    console.log('Destinaritos',to);
   
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    console.log('entrou aqui')
    const msg = {
      to: to, // Change to your recipient
      from: 'crmemailsucs@gmail.com', // Change to your verified sender
      subject: data.assunto,
      text: data.mensagem,
      html: '<p>'+data.mensagem+'</p>',
    }
  sgMail
      .send(msg)
      .then(() => {
        const email = Email.create({assunto:data.assunto,mensagem: data.mensagem, contacts: data.remetentes, usuario: data.idUsuario, situacao: 1});
        console.log('Email sent')
      })
      .catch((error) => {
        const email = Email.create({assunto:data.assunto,mensagem: data.mensagem, contacts: data.remetentes, usuario: data.idUsuario, situacao: 0, erro:error});
        console.error(error)
      })
    }
    catch(err){
      console.log(err);
    }
},
async index(req,res){
  const email = await Email.find().populate('usuario').populate('usuario','nome_usuario');
  res.json(email);
},
async delete(req, res) {
  const { _id } = req.params;
  const email = await Email.findByIdAndDelete({ _id });
  return res.json(email);
},
async details(req,res){
  const {_id} = req.params;
  const email = await Email.findOne({ _id }).populate('usuario').populate('usuario','nome_usuario');
  res.json(email);
}, 
}