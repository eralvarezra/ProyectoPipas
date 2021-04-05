'use strict';

const mongoose = require('mongoose');
const schema_login = new mongoose.Schema(
    // aqui va el esquema de lo que usariamos
    {
        correo: { type: String, required: true, unique: true },
        contrasena: { type: String, required: true, unique: false },
        tipoPerfil: { type: String, required: false, unique: false }
    }

);

module.exports = mongoose.model('login', schema_login, 'Login');
// el ultimo nombre, en este caso Login con mayuscula, es el nombre de la collection que se va usar. 
//Si el nombre no calza, mongodb la va crear por defecto