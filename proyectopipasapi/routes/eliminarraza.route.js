'use strict';

const express = require('express');
const router = express.Router();

const eliminarraza = require('../models/eliminarraza.model');

router.delete('/eliminar_raza', (req, res) => {
    let _id = req.body._id;
    eliminarraza.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la raa',
                err
            });
        } else {
            res.json({
                msj: 'La raza se eliminó correctamente'
            });
        }
    });
});
//Luego se va al server.js
module.exports = router;