'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Factura = require('../models/registroFactura.model');

//Endpoint para registrar comentarios
router.post('/registrar-factura', (req, res) => {
    let nueva_factura = new Factura({
        nombreEmpresa: req.body.nombreEmpresa,
        tipoServicio: req.body.tipoServicio,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        correoUsuario: req.body.correoUsuario
    });

    nueva_factura.save((err, factura_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                factura_db
            })
        }
    });
});
router.get('/listar-factura', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Factura.find((err, lista_factura) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las facturas",
                err
            });
        } else {
            res.json({ lista_factura })
        }
    })
});

module.exports = router;