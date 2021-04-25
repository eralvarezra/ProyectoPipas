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
                msj: "No se pudo registrar la vacuna",
                err
            });
        } else {
            res.json({
                msj: "La vacuna se registró exitosamente.",
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
                msj: "No se pudieron mostrar las vacunas",
                err
            });
        } else {
            res.json({ lista_vacuna })
        }
    })
});


router.put('/modificar-vacunas', (req, res) => {
    Vacuna.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreVacuna: req.body.nombreVacuna,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la vacuna.",
                err
            });
        } else {
            res.json({
                msj: "La vacuna fue modificada exitosamente.",
                info
            })
        }
    });
});
router.delete('/eliminar-vacuna', (req, res) => {
    let _id = req.body._id;
    Vacuna.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la vacuna.',
                err
            });
        } else {
            res.json({
                msj: 'La vacuna se eliminó correctamente.'
            });
        }
    });
});

//Luego se va al server.js

module.exports = router;