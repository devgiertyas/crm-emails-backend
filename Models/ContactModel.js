const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_contato: String,
    email_contato: String,
    telefone_contato: String,
}, {
    timestamps: true
});

DataSchema.set('toJSON', {
    virtuals: true
});

const contacts = mongoose.model('Contacts', DataSchema);

module.exports = contacts;
