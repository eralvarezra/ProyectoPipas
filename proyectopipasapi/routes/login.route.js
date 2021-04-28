'use strict';

const express = require('express');
const router = express.Router();
// se crea primero el model
const Login = require('../models/login.model')
const RegistroProveedor = require('../models/registroProveedor.model')
const Usuario = require('../models/registroUsuario.model')
    // metodos para extraer
const recuperar = require('../models/recuperar.model')
const mailer = require('../routes/proyectopipastemplates/registroOlvide-correo');

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

/// buscar por proveedor 


router.post('/registrar-recuperar', (req, res) => {
    let nuevo_recuperar = new recuperar({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        //por aca se puede mandar mas data por cookie, o por let
    });

    nuevo_recuperar.save((err, recuperar_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar correctamente.",
                err
            });

        } else {
            res.json({
                msj: "Su comentario se guardo exitosamente.",
                recuperar_db
            });
            mailer.enviar_email(recuperar_db.nombre, recuperar_db.correo, recuperar_db.contrasena)
        }
    });

});

module.exports = router;