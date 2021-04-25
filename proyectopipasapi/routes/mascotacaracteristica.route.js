'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const MascotaCS = require('../models/mascotaCaracEsp.model');

//Endpoint para registrar comentarios
router.post('/registrar-mascotacaracteristica', (req, res) => {
    let nueva_mascotaCS = new MascotaCS({
        correo: req.body.correo,
        nombreMascota: req.body.nombreMascota,
        caracteristicaEspecial: req.body.caracteristicaEspecial
    });

    nueva_mascotaCS.save((err, mascotaCS_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar la característica de la mascota.",
                err
            });
        } else {
            res.json({
                msj: "La característica se registró exitosamente.",
                mascotaCS_db
            })
        }
    });
});

router.get('/listar-mascotacaracteristica', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    MascotaCS.find((err, lista_MascotaCS) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las características.",
                err
            });
        } else {
            res.json({ lista_MascotaCS })
        }
    })
});


router.put('/modificar-mascotacaracteristica', (req, res) => {
    MascotaCS.updateOne({
        _id: req.body._id
    }, {
        $set: {
            caracteristicaEspecial: req.body.caracteristicaEspecial,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la característica.",
                err
            });
        } else {
            res.json({
                msj: "La característica fue modificada exitosamente.",
                info
            })
        }
    });
});
router.delete('/eliminar-mascotacaracteristica', (req, res) => {
    let _id = req.body._id;
    MascotaCS.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la característica de la mascota.',
                err
            });
        } else {
            res.json({
                msj: 'La característica para su mascota se eliminó correctamente.'
            });
        }
    });
});

//Luego se va al server.js

module.exports = router;