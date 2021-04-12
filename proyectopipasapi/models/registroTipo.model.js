'use strict';

const mongoose = require('mongoose');
// Para  ser interpretado hay que decirle que lo vamos a utilizar usando mongoose
//Se le pasa el esquema
const schema_tipo = new mongoose.Schema({
    nombreTipo: { type: String, required: true, unique: true },
    fechaCreacion: { type: Date, required: true, unique: false }
});


module.exports = mongoose.model('Tipo', schema_tipo, 'Tipo');