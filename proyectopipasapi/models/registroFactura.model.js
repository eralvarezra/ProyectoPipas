'use strict';

const mongoose = require('mongoose');

const schema_factura = new mongoose.Schema({
    nombreEmpresa: { type: String, required: true, unique: false },
    tipoServicio: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    precio: { type: String, required: true, unique: false },
    correoUsuario: { type: String, required: true, unique: false },
    correoProveedor: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('Factura', schema_factura, 'Factura');