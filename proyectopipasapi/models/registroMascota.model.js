'use strict';

const mongoose = require('mongoose');

const schema_mascota = new mongoose.Schema({
    nombreMascota: { type: String, required: true, unique: false },
    tipoMascota: { type: String, required: true, unique: false },
    tipoRaza: { type: String, required: true, unique: false },
    fotoMascota: { type: String, required: true, unique: false },
    caracteristicaEspecial: { type: String, required: true, unique: false },
    tipoPadecimiento: { type: String, required: true, unique: false },
    tipoVacuna: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false }

});

module.exports = mongoose.model('Mascota', schema_mascota, 'Mascota');