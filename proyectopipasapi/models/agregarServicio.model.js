'use strict';

const mongoose = require('mongoose');
// Para  ser interpretado hay que decirle que lo vamos a utilizar usando mongoose
//Se le pasa el esquema
const schema_agregarServicio = new mongoose.Schema({
    nombreServicio: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: false },
    tipoMascota: { type: String, required: true, unique: false },
    precio: { type: Number, required: true, unique: false },
    detalleServicio: { type: String, required: true, unique: false },
    costoServicioXhora: { type: Number, required: true, unique: false },
    fechaCreacion: { type: Date, required: true, unique: false }

});

module.exports = mongoose.model('AgregarServicio', schema_agregarServicio, 'AgregarServicio');