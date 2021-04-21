'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Usuario = require('../models/registroUsuario.model');

//Endpoint para registrar comentarios
router.post('/registrar-usuario', (req, res) => {
    let nuevo_usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        tipoIdentificacion: req.body.tipoIdentificacion,
        identificacion: req.body.identificacion,
        fechaNacimiento: req.body.fechaNacimiento,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        genero: req.body.genero,
        cantidadMascotas: req.body.cantidadMascotas,
        telefono: req.body.telefono,
        correo: req.body.correo,
        numeroTarjeta: req.body.numeroTarjeta,
        fechaVencimiento: req.body.fechaVencimiento,
        foto: req.body.foto,
        estado: 'Pendiente',
        activo: 'Activo',
        contrasena: '',
    });

    nuevo_usuario.save((err, usuario_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el usuario",
                err
            });
        } else {
            res.json({
                msj: "El usuario se registró exitosamente.",
                usuario_db
            })
        }
    });
});

router.get('/listar-usuario', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Usuario.find((err, lista_usuario) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_usuario })
        }
    })
});
router.put('/activar-usuario', (req, res) => {
    Usuario.updateOne({
        _id: req.body._id
    }, {
        $set: {
            activo: 'Activo'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del usuario",
                err
            });
        } else {
            res.json({
                msj: "El usuario ha sido activado",
                info
            })
        }
    });

});

router.put('/desactivar-usuario', (req, res) => {
    Usuario.updateOne({
        _id: req.body._id
    }, {
        $set: {
            activo: 'Inactivo'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del usuario",
                err
            });
        } else {
            res.json({
                msj: "El usuario ha sido desactivado",
                info
            })
        }
    });

});

//Luego se va al server.js

module.exports = router;