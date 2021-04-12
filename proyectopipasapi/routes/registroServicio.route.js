'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Servicio = require('../models/registroServicio.model');

//Endpoint para registrar comentarios
router.post('/registrar-tipoServicio', (req, res) => {
    let nuevo_Servicio = new Servicio({
        nombreServicio: req.body.nombreServicio,
        fechaCreacion: req.body.fechaCreacion
    });

    nuevo_Servicio.save((err, tipoServicio) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                tipoServicio
            })
        }
    });
});

router.get('/listar-tipoServicio', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Servicio.find((err, lista_Servicio) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los tipos",
                err
            });
        } else {
            res.json({ lista_Servicio })
        }
    })
});
router.put('/modificar-tipoServicio', (req, res) => {
    Servicio.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreTipo: req.body.nombreServicio,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el servicio",
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
router.delete('/eliminar-tipoServicio', (req, res) => {
    let _id = req.body._id;
    Servicio.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el servicio',
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