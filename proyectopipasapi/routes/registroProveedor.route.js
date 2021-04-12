'use strict';

const express = require('express');
const router = express.Router();
const RegistroProveedor = require('../models/registroProveedor.model');

router.post('/registrar-proveedor', (req, res) => {
    let nuevo_proveedor = new RegistroProveedor({
        tipoProveedor: req.body.tipoProveedor,
        tipoServicio: req.body.tipoServicio,
        tipoIdentificacion: req.body.tipoIdentificacion,
        pAcargo: req.body.pAcargo,
        empresa: req.body.empresa,
        contrasena: req.body.contrasena,
        telefono: req.body.telefono,
        correo: req.body.correo,
        provincias: req.body.provincias,
        cantones: req.body.cantones,
        distritos: req.body.distritos,
        comentarios: req.body.comentarios,
        myFile: req.body.myFile,
        activo: req.body.activo
    });

    nuevo_proveedor.save((err, proveedor_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar su perfil",
                err
            });

        } else {
            res.json({
                msj: "Sus registros se guardaron exitosamente",
                proveedor_db
            });
        }
    });

});

router.get('/listar-proveedor', (req, res) => {
    RegistroProveedor.find((err, lista_proveedor) => {
        if (err) {
            res.json({
                msj: "No se pudo encontrar su perfil",
                err
            });

        } else {
            res.json({ lista_proveedor });
        }
    });

});

module.exports = router;