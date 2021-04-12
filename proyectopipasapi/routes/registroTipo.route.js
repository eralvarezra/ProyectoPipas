'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Tipo = require('../models/registroTipo.model');

//Endpoint para registrar comentarios
router.post('/registrar-tipo', (req, res) => {
    let nueva_tipo = new Tipo({
        nombreTipo: req.body.nombreTipo,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_tipo.save((err, tipo_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                tipo_db
            })
        }
    });
});

router.get('/listar-tipo', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Tipo.find((err, lista_tipo) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los tipos",
                err
            });
        } else {
            res.json({ lista_tipo })
        }
    })
});
router.put('/modificar-tipo', (req, res) => {
    Tipo.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreTipo: req.body.nombreTipo,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el tipo",
                err
            });
        } else {
            res.json({
                msj: "El tipo fue modificado exitosamente",
                info
            })
        }
    });
});
router.delete('/eliminar-tipo', (req, res) => {
    let _id = req.body._id;
    Tipo.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el tipo',
                err
            });
        } else {
            res.json({
                msj: 'El tipo se eliminó correctamente'
            });
        }
    });
});
//Luego se va al server.js
module.exports = router;