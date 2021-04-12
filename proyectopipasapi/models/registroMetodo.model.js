'use strict';

const mongoose = require('mongoose');
// Para  ser interpretado hay que decirle que lo vamos a utilizar usando mongoose
//Se le pasa el esquema
const schema_metodo = new mongoose.Schema({
    nombreMetodo: { type: String, required: true, unique: true },
    fechaCreacion: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Metodo', schema_metodo, 'Metodo');