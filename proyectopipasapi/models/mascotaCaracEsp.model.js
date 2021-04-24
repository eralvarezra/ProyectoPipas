'use strict'

const mongoose = require('mongoose');
const schema_mascotaCS = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    nombreMascota: { type: String, required: true, unique: true },
    caracteristicaEspecial: { type: String, required: true, unique: false },

});

module.exports = mongoose.model('MascotaCS', schema_mascotaCS, 'MascotaCS');