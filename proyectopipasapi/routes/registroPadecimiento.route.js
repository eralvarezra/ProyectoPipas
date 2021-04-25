'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Padecimiento = require('../models/registroPadecimiento.model');

//Endpoint para registrar comentarios
router.post('/registrar-padecimiento', (req, res) => {
    let nuevo_padecimiento = new Padecimiento({
        nombrePadecimiento: req.body.nombrePadecimiento,
        fechaCreacion: req.body.fechaCreacion
    });

    nuevo_padecimiento.save((err, padecimientos_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el padecimiento.",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                padecimientos_db
            })
        }
    });
});

router.get('/listar-padecimientos', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Padecimiento.find((err, lista_padecimiento) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los padecimientos.",
                err
            });
        } else {
            res.json({ lista_padecimiento })
        }
    })
});
router.put('/modificar-padecimientos', (req, res) => {
    Padecimiento.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombrePadecimiento: req.body.nombrePadecimiento,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la padecimiento.",
                err
            });
        } else {
            res.json({
                msj: "El padecimiento fue modificado exitosamente.",
                info
            })
        }
    });
});
router.delete('/eliminar-padecimiento', (req, res) => {
    let _id = req.body._id;
    Padecimiento.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el padecimiento.',
                err
            });
        } else {
            res.json({
                msj: 'La característica se eliminó correctamente.'
            });
        }
    });
});
//Luego se va al server.js
module.exports = router;