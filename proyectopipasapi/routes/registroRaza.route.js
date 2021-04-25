'use strict';

const express = require('express');
const router = express.Router();

const Raza = require('../models/registroRaza.model');

router.post('/registrar-raza', (req, res) => {
    let nueva_raza = new Raza({
        nombreRaza: req.body.nombreRaza,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_raza.save((err, raza_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar la raza.",
                err
            });
        } else {
            res.json({
                msj: "La raza se registró exitosamente.",
                raza_db
            })
        }
    });
});

router.get('/listar-raza', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Raza.find((err, lista_raza) => {
        if (err) {
            res.json({
                msj: "No se pudo agregar la raza.",
                err
            });
        } else {
            res.json({ lista_raza })
        }
    })
});

router.put('/modificar-razas', (req, res) => {
    Raza.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreRaza: req.body.nombreRaza,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la raza.",
                err
            });
        } else {
            res.json({
                msj: "La raza fue modificada exitosamente.",
                info
            })
        }
    });
});
router.delete('/eliminar-raza', (req, res) => {
    let _id = req.body._id;
    Raza.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la raza.',
                err
            });
        } else {
            res.json({
                msj: 'La raza se eliminó correctamente.'
            });
        }
    });
});

module.exports = router;