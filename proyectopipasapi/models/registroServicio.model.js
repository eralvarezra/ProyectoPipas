'use strict';

const mongoose = require('mongoose');
// Para  ser interpretado hay que decirle que lo vamos a utilizar usando mongoose
//Se le pasa el esquema
const schema_servicio = new mongoose.Schema({
    nombreServicio: { type: String, required: true, unique: true },
    fechaCreacion: { type: Date, required: true, unique: false }
});


module.exports = mongoose.model('Servicio', schema_servicio, 'Servicio');