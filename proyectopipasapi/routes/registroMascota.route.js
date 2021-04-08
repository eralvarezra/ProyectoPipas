'use strict';

const express = require('express');
const router = express.Router();
const Mascota = require('../models/registroMascota.model');

router.post('/registrar-mascota', (req, res) => {
    let nueva_mascota = new Mascota({
        nombreMascota: req.body.nombreMascota,
        tipoMascota: req.body.tipoMascota,
        tipoRaza: req.body.tipoRaza,
        fotoMascota: req.body.fotoMascota,
        caracteristicaEspecial: req.body.caracteristicaEspecial,
        tipoPadecimiento: req.body.tipoPadecimiento,
        tipoVacuna: req.body.tipoVacuna,
        correo: req.body.correo
    });

    nueva_mascota.save((err, mascota_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar su mascota",
                err
            });

        } else {
            res.json({
                msj: "Su mascota se guardo exitosamente",
                mascota_db
            });
        }
    });

})

router.get('/listar-mascota', (req, res) => {
    Mascota.find((err, lista_mascotas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las mascotas",
                err
            });

        } else {
            res.json({ lista_mascotas });
        }
    });

});

module.exports = router;