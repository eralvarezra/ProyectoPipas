'use strict';

const express = require('express');
const router = express.Router();

const eliminarraza = require('../models/modificarraza.model');

router.put('/modificar-raza', (req, res) => {
    eliminarraza.updateOne({
        _id: req.body._id
    }, {
        $set: {
            eliminarraza: req.body.eliminarraza,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la caracteristica",
                err
            });
        } else {
            res.json({
                msj: "La caracteristica fue modificada exitosamente",
                info
            })
        }
    });
});
//Luego se va al server.js
module.exports = router;