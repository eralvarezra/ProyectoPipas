'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Impuesto = require('../models/registroImpuesto.model');

//Endpoint para registrar comentarios
router.post('/registrar-impuesto', (req, res) => {
    let nueva_impuesto = new Impuesto({
        nombreImpuesto: req.body.nombreImpuesto,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_impuesto.save((err, impuesto_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                impuesto_db
            })
        }
    });
});

router.get('/listar-impuesto', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Impuesto.find((err, lista_impuesto) => {
        if (err) {
            res.json({
                msj: "No se pudo mostrar el impuesto",
                err
            });
        } else {
            res.json({ lista_impuesto })
        }
    })
});
router.put('/modificar-impuesto', (req, res) => {
    Impuesto.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreImpuesto: req.body.nombreImpuesto,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el impuesto",
                err
            });
        } else {
            res.json({
                msj: "El impuesto fue modificado exitosamente",
                info
            })
        }
    });
});
module.exports = router;