'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Caracteristica = require('../models/registrotipoCaracteristica.model');

//Endpoint para registrar comentarios
router.post('/registrar-caracteristica', (req, res) => {
    let nueva_caracteristica = new Caracteristica({
        nombreCaracteristica: req.body.nombreCaracteristica,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_caracteristica.save((err, caracteristicas_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                caracteristicas_db
            })
        }
    });
});

router.get('/listar-caracteristicas', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Caracteristica.find((err, lista_caracteristica) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las caracteristicas",
                err
            });
        } else {
            res.json({ lista_caracteristica })
        }
    })
});
router.put('/modificar-caracteristicas', (req, res) => {
    Caracteristica.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreCaracteristica: req.body.nombreCaracteristica,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la caracteristica",
                err
            });
        } else {
            res.json({
                msj: "La caracteristica fue modificada exitosamente",
                info
            })
        }
    });
});
router.delete('/eliminar-caracteristica', (req, res) => {
    let _id = req.body._id;
    Caracteristica.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la caracteristica',
                err
            });
        } else {
            res.json({
                msj: 'La caracteristica se eliminó correctamente'
            });
        }
    });
});
//Luego se va al server.js
module.exports = router;