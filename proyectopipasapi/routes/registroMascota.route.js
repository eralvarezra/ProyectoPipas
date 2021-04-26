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
        correo: req.body.correo
    });

    nueva_mascota.save((err, mascota_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar su mascota.",
                err
            });

        } else {
            res.json({
                msj: "Su mascota se guardó exitosamente.",
                mascota_db
            });
        }
    });

})

router.get('/listar-mascota', (req, res) => {
    Mascota.find((err, lista_mascotas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las mascotas.",
                err
            });

        } else {
            res.json({ lista_mascotas });
        }
    });

});

router.put('/modificar-Mascota', (req, res) => {
    Mascota.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreMascota: req.body.nombreMascota,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudieron modificar los datos de su mascota.",
                err
            });
        } else {
            res.json({
                msj: "Los datos de su mascota se modificaron satisfactoriamente.",
                info
            })
        }
    });
});

router.delete('/eliminar-mascota', (req, res) => {
    let _id = req.body._id;
    Mascota.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la mascota.',
                err
            });
        } else {
            res.json({
                msj: 'La mascota ha sido eliminada.'
            });
        }
    });
});

module.exports = router;