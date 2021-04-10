'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Vacuna = require('../models/registroVacunas.model');

//Endpoint para registrar comentarios
router.post('/registrar-vacuna', (req, res) => {
    let nueva_vacuna = new Vacuna({
        nombreVacuna: req.body.nombreVacuna,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_vacuna.save((err, vacuna_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                vacuna_db
            })
        }
    });
});

router.get('/listar-vacunas', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Vacuna.find((err, lista_vacuna) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_vacuna })
        }
    })
});


//Luego se va al server.js

module.exports = router;