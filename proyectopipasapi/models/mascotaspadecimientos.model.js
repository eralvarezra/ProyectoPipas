'use strict'

const mongoose = require('mongoose');
const schema_mascotaPadecimiento = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    nombreMascota: { type: String, required: true, unique: true },
    tipoPadecimiento: { type: String, required: true, unique: false },

});

module.exports = mongoose.model('MascotaPadecimiento', schema_mascotaPadecimiento, 'MascotaPadecimiento');