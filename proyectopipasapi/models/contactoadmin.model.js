'use strict'

const moongose = require('mongoose');
const schema_contactoadmin = new moongose.Mongoose.schema({
    nombreUsuario: { type: String, required: true, unique: true },
    telefonoUsuario: { type: String, required: true, unique: true },
    correoUsuario: { type: String, required: true, unique: true },
    comentarioUsuario: { type: String, required: true, unique: true },

});

module.exports = moongose.model('contactoadmin', schema_contactoadmin, 'contactoadmin');