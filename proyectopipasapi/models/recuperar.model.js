'use strict';

const mongoose = require('mongoose');
const schema_recuperar = new mongoose.Schema(
    // aqui va el esquema de lo que usariamos
    {
        nombre: { type: String, required: true, unique: true },
        correo: { type: String, required: true, unique: false },
        contrasena: { type: String, required: false, unique: false }
    }
);

module.exports = mongoose.model('recuperar', schema_recuperar, 'recuperar');
// el ultimo nombre, en este caso Recuperar con mayuscula, es el nombre de la collection que se va usar. 
//Si el nombre no calza, mongodb la va crear por defecto