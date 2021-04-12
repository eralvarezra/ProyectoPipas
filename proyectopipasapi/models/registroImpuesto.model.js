'use strict';

const mongoose = require('mongoose');
// Para  ser interpretado hay que decirle que lo vamos a utilizar usando mongoose
//Se le pasa el esquema
const schema_impuesto = new mongoose.Schema({
    nombreImpuesto: { type: Number, required: true, unique: true },
    fechaCreacion: { type: Date, required: true, unique: false }
});


module.exports = mongoose.model('Impuesto', schema_impuesto, 'Impuesto');