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

/// buscar por proveedor 
router.get('/buscar-por-correo-usuario', (req, res) => {
    let correo = req.query.correo;
    Usuario.findOne({ correo: correo }, (err, usuario_db) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios.",
                err
            });
        } else {
            res.json({ usuario_db })
                /// buscar usuario
        }
    })
});

router.get('/buscar-por-correo-proveedor', (req, res) => {
    let correo = req.query.correo;
    Proveedor.findOne({ correo: correo }, (err, proveedor_db) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los proveedor.",
                err
            });
        } else {
            res.json({ proveedor_db })
                /// buscar proveedor 
        }
    })
});




// router.put('/modificar-contrasena', (req, res) => {
//     Usuario.updateOne({
//         _id: req.body._id
//     }, {
//         $set: {
//             contrasena: req.body.contrasena,
//             categoria: '2'
//         }
//     }, (err, info) => {
//         if (err) {
//             res.json({
//                 msj: "No se pudo modificar la contraseña del usuario.",
//                 err
//             });
//         } else {
//             res.json({
//                 msj: "La contraseña fue modificada exitosamente.",
//                 info
//             })
//         }
//     });
// });


module.exports = router;