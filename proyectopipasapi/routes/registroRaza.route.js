'use strict';

const express = require('express');
const router = express.Router();

const registroRaza = require('../models/registroRaza.model');

router.post('registrar-registroRaza', (req, res) => {
    let nueva_registroRaza = new registroRaza({
        registroRaza: req.body.agregarraza,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_registroRaza.save((err, registroRaza_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                registroRaza_db
            })
        }
    });
});

router.get('/listar-registroRaza', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    registroRaza.find((err, lista_registroRaza) => {
        if (err) {
            res.json({
                msj: "No se pudo agregar la raza",
                err
            });
        } else {
            res.json({ lista_registroRaza })
        }
    })
});

module.exports = router;