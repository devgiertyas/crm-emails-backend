const { json } = require('express');
const sgMail = require('@sendgrid/mail');

require('dotenv').config({ path: '../../sendgrid.env' })

module.exports = {
async SendEmail() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  console.log('entrou aqui')
  const msg = {
    to: 'ngsilva2@ucs.br', // Change to your recipient
    from: 'crmemailsucs@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
},
}