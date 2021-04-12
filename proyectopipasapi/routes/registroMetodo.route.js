'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Metodo = require('../models/registroMetodo.model');

//Endpoint para registrar comentarios
router.post('/registrar-metodo', (req, res) => {
    let nueva_metodo = new Metodo({
        nombreMetodo: req.body.nombreMetodo,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_metodo.save((err, metodos_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                metodos_db
            })
        }
    });
});

router.get('/listar-metodos', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Metodo.find((err, lista_metodo) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las caracteristicas",
                err
            });
        } else {
            res.json({ lista_metodo })
        }
    })
});
router.put('/modificar-metodos', (req, res) => {
    Metodo.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreMetodo: req.body.nombreMetodo,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el metodo de pago",
                err
            });
        } else {
            res.json({
                msj: "El metodo de pagofue modificado exitosamente",
                info
            })
        }
    });
});
// router.delete('/eliminar-caracteristica', (req, res) => {
//     let _id = req.body._id;
//     Caracteristica.findOneAndRemove({ _id: _id }, (err) => {
//         if (err) {
//             res.json({
//                 msj: 'No se pudo eliminar la caracteristica',
//                 err
//             });
//         } else {
//             res.json({
//                 msj: 'La caracteristica se eliminó correctamente'
//             });
//         }
//     });
// });
//Luego se va al server.js
module.exports = router;