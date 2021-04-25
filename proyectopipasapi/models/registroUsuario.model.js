'use strict';

const mongoose = require('mongoose');
// Para  ser interpretado hay que decirle que lo vamos a utilizar usando mongoose
//Se le pasa el esquema
const schema_usuario = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    apellido: { type: String, required: true, unique: false },
    tipoIdentificacion: { type: String, required: true, unique: false },
    identificacion: { type: String, required: true, unique: false },
    fechaNacimiento: { type: Date, required: true, unique: false },
    provincia: { type: Number, required: true, unique: false },
    canton: { type: Number, required: true, unique: false },
    distrito: { type: Number, required: true, unique: false },
    genero: { type: String, required: true, unique: false },
    cantidadMascotas: { type: Number, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    numeroTarjeta: { type: String, required: true, unique: false },
    fechaVencimiento: { type: Date, required: true, unique: false },
    foto: { type: String, required: true, unique: false },
    // estado: { type: String, required: true, unique: false },
    activo: { type: String, required: true, unique: false },
    categoria: { type: String, required: true, unique: false },
    contrasena: { type: String, required: true, unique: false },
});

module.exports = mongoose.model('Usuario', schema_usuario, 'Usuario');