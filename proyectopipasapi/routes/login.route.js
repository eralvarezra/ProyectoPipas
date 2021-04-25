'use strict';

const express = require('express');
const router = express.Router();
// se crea primero el model
const Login = require('../models/login.model')
const RegistroProveedor = require('../models/registroProveedor.model')
const Usuario = require('../models/registroUsuario.model')
    // metodos para extraer

// req = request res= response 
router.get('/datos-login', (req, res) => {
    Login.find((err, datos_login) => { // Posibles elementos findone - findbyid // correo es unico
        if (err) {
            res.json({
                msj: "No se pudo iniciar sesión.",
                err
            });
        } else {
            res.json({ datos_login })
        }
    });
});

router.get('/datos-login-proveedor', (req, res) => {
    RegistroProveedor.find((err, datos_login) => { // Posibles elementos findone - findbyid // correo es unico
        if (err) {
            res.json({
                msj: "No se pudo iniciar sesión.",
                err
            });
        } else {
            res.json({ datos_login })
        }
    });
});

router.get('/datos-login-usuario', (req, res) => {
    Usuario.find((err, datos_login) => { // Posibles elementos findone - findbyid // correo es unico
        if (err) {
            res.json({
                msj: "No se pudo iniciar sesión.",
                err
            });
        } else {
            res.json({ datos_login })
        }
    });
});

module.exports = router;