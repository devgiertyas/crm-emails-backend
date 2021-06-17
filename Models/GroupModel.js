const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_grupo: String,
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

const groups = mongoose.model('Groups', DataSchema);

module.exports = groups;
