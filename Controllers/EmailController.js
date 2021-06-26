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
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
  sgMail
      .send(msg)
      .then(() => {
        const email = Email.create({assunto:data.assunto,mensagem: data.mensagem, contacts: data.remetentes});
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    }
    catch(err){
      console.log(err);
    }
},
async index(req,res){
  const email = await Email.find().populate('contacts');
  res.json(email);
},
}