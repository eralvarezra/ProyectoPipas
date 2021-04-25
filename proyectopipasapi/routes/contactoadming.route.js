'use strict';

const express = require('express');
const router = express.Router();

const contactoadmin = require('../models/contactoadmin.model');

router.post('/registrar-contactoadmin', (req, res) => {
    let nuevo_contactoadmin = new contactoadmin({
        nombreMascota: req.body.nombreMascota,
        tipoMascota: req.body.tipoMascota,
        tipoRaza: req.body.tipoRaza,
        fotoMascota: req.body.fotoMascota,
        caracteristicaEspecial: req.body.caracteristicaEspecial,
        tipoPadecimiento: req.body.tipoPadecimiento,
        tipoVacuna: req.body.tipoVacuna,
        correo: req.body.correo
    });

    nuevo_contactoadmin.save((err, contactoadmin_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar su comentario",
                err
            });

        } else {
            res.json({
                msj: "Su comentario se guardo exitosamente",
                contactoadmin_db
            });
        }
    });

})

router.get('/listar-contactoadmin', (req, res) => {
    contactoadmin.find((err, lista_contactoadmin) => {
        if (err) {
            res.json({
                msj: "No se pueden mostrar los comentarios",
                err
            });

        } else {
            res.json({ lista_contactoadmin });
        }
    });

});

module.exports = router;