'use strict';

const express = require('express');
const router = express.Router();

const contactoadmin = require('../models/contactoadmin.model');
const mailer = require('../routes/proyectopipastemplates/contactoadmin-correo');

router.post('/registrar-contactoadmin', (req, res) => {

    let nuevo_contactoadmin = new contactoadmin({
        nombreUsuario: req.body.nombreUsuario,
        telefonoUsuario: req.body.telefonoUsuario,
        correoUsuario: req.body.correoUsuario,
        comentarioUsuario: req.body.comentarioUsuario,
    });

    nuevo_contactoadmin.save((err, contactoadmin_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el comentario.",
                err
            });

        } else {
            res.json({
                msj: "Su comentario se guardo exitosamente.",
                contactoadmin_db
            });
            mailer.enviar_email(`${contactoadmin_db.nombreUsuario}`, contactoadmin_db.correoUsuario, contactoadmin_db.comentarioUsuario)
        }
    });

});


module.exports = router;