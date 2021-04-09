'use strict';

const mongoose = require('mongoose');
const schema_calificarServicio = new mongoose.Schema(
    // aqui va el esquema de lo que usariamos
    {
        nombreProveedor: { type: String, required: true, unique: false },
        comentario: { type: String, required: true, unique: false },
        calificacion: { type: Number, required: true, unique: false }
    }

);

module.exports = mongoose.model('calificarServicio', schema_calificarServicio, 'calificarServicio');