'use strict'

const mongoose = require('mongoose');
const schema_mascotaVacuna = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    nombreMascota: { type: String, required: true, unique: true },
    nombreVacuna: { type: String, required: true, unique: false },

});

module.exports = mongoose.model('MascotaVacuna', schema_mascotaVacuna, 'MascotaVacuna');