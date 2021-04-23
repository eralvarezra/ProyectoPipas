'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const MascotaVacuna = require('../models/mascotavacuna.model');

//Endpoint para registrar comentarios
router.post('/registrar-mascotavacuna', (req, res) => {
    let nueva_mascotaVacuna = new MascotaVacuna({
        correo: req.body.correo,
        nombreMascota: req.body.nombreMascota,
        nombreVacuna: req.body.nombreVacuna
    });

    nueva_mascotaVacuna.save((err, mascotaVacuna_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                mascotaVacuna_db
            })
        }
    });
});

router.get('/listar-MascotaVacuna', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    MascotaVacuna.find((err, lista_Mascotavacuna) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las vacunas",
                err
            });
        } else {
            res.json({ lista_Mascotavacuna })
        }
    })
});


router.put('/modificar-mascotavacunas', (req, res) => {
    MascotaVacuna.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreMascota: req.body.nombreMascota,
            nombreVacuna: req.body.nombreVacuna,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la vacuna",
                err
            });
        } else {
            res.json({
                msj: "La vacuna fue modificada exitosamente",
                info
            })
        }
    });
});
router.delete('/eliminar-Mascotavacuna', (req, res) => {
    let _id = req.body._id;
    MascotaVacuna.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la vacuna de la mascota',
                err
            });
        } else {
            res.json({
                msj: 'La vacuna para su Mascota se eliminó correctamente'
            });
        }
    });
});

//Luego se va al server.js

module.exports = router;