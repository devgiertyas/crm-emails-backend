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

      sgMail.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: to, // Change to your recipient
        from: 'crmemailsucs@gmail.com', // Change to your verified sender
        subject: data.assunto,
        text: data.mensagem,
        html: '<p>' + data.mensagem + '</p>',
      }
      sgMail
        .send(msg)
        .then(() => {
          const email = Email.create({ assunto: data.assunto, mensagem: data.mensagem, contacts: data.remetentes, usuario: data.idUsuario, situacao: 1, erro: 'E-mail enviado com sucesso' });
          return res.status(200).json(email);
        })
        .catch((error) => {
          const email = Email.create({ assunto: data.assunto, mensagem: data.mensagem, contacts: data.remetentes, usuario: data.idUsuario, situacao: 0, erro: error });
          console.error(error)
          return res.status(500).json(email);
        })
    }
    catch (err) {
      console.log(err);
    }
  },
  async index(req, res) {
    const email = await Email.find().populate('usuario').populate('usuario', 'nome_usuario');
    res.json(email);
  },
  async delete(req, res) {
    const { _id } = req.params;
    const email = await Email.findByIdAndDelete({ _id });
    return res.json(email);
  },
  async details(req, res) {
    const { _id } = req.params;
    const email = await Email.findOne({ _id }).populate('contacts').populate('usuario', 'nome_usuario');
    res.json(email);
  },
  async emailCountDay(req, res) {
    try {
      const email = await Email.countDocuments();
      res.json(email);
    } catch (error) {

    }
  },
  async lastfiveEmails(req, res) {
    try {
      const email = await Email.find().sort({ $natural: -1 }).limit(5).populate('contacts').populate('usuario', 'nome_usuario');
      res.json(email);
    } catch (error) {
      console.log(error)
    }
  },
}