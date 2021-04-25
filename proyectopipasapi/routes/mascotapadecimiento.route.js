'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const MascotaPadecimiento = require('../models/mascotaspadecimientos.model');

//Endpoint para registrar comentarios
router.post('/registrar-mascotapadecimiento', (req, res) => {
    let nueva_mascotapadecimiento = new MascotaPadecimiento({
        correo: req.body.correo,
        nombreMascota: req.body.nombreMascota,
        tipoPadecimiento: req.body.tipoPadecimiento
    });

    nueva_mascotapadecimiento.save((err, mascotaPadecimiento_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                mascotaPadecimiento_db
            })
        }
    });
});

router.get('/listar-MascotaPadecimiento', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    MascotaPadecimiento.find((err, lista_Mascotapadecimiento) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las vacunas",
                err
            });
        } else {
            res.json({ lista_Mascotapadecimiento })
        }
    })
});


router.put('/modificar-mascotapadecimiento', (req, res) => {
    MascotaPadecimiento.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreMascota: req.body.nombreMascota,
            tipoPadecimiento: req.body.tipoPadecimiento
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el padecimiento",
                err
            });
        } else {
            res.json({
                msj: "El padecimiento fue modificada exitosamente",
                info
            })
        }
    });
});

router.delete('/eliminar-MascotaPadecimiento', (req, res) => {
    let _id = req.body._id;
    MascotaPadecimiento.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el padecimiento de la mascota',
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