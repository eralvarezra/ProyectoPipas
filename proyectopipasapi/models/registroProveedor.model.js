'use strict';

const mongoose = require('mongoose');

const schema_registroProveedor = new mongoose.Schema({
    tipoProveedor: { type: String, required: true, unique: false },
    tipoServicio: { type: String, required: true, unique: false },
    tipoIdentificacion: { type: String, required: true, unique: false },
    pAcargo: { type: String, required: true, unique: false },
    empresa: { type: String, required: true, unique: false },
    contrasena: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: true },
    provincias: { type: Number, required: true, unique: false },
    cantones: { type: Number, required: true, unique: false },
    distritos: { type: Number, required: true, unique: false },
    comentarios: { type: String, required: true, unique: false },
    myFile: { type: String, required: true, unique: false },
    activo: { type: String, required: true, unique: false }

});

module.exports = mongoose.model('RegistroProveedor', schema_registroProveedor, 'RegistroProveedor');