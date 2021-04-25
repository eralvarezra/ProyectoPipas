'use strict'

const mongoose = require('mongoose');
const schema_contactoadmin = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    telefonoUsuario: { type: String, required: true, unique: true },
    correoUsuario: { type: String, required: true, unique: true },
    comentarioUsuario: { type: String, required: true, unique: true },

});

module.exports = mongoose.model('contactoadmin', schema_contactoadmin, 'contactoadmin');