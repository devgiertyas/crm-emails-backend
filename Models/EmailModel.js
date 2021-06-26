const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_grupo: String,
    mensagem: String,
    assunto: String,
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contacts',
    }]
}, {
    timestamps: true
});

DataSchema.set('toJSON', {
    virtuals: true
});

const emails = mongoose.model('Emails', DataSchema);

module.exports = emails;
