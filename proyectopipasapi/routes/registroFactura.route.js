'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Factura = require('../models/registroFactura.model');
const mailer = require('../routes/proyectopipastemplates/servicioSolicitado-correo');
//Endpoint para registrar comentarios
router.post('/registrar-factura', (req, res) => {
    let nueva_factura = new Factura({
        nombreEmpresa: req.body.nombreEmpresa,
        tipoServicio: req.body.tipoServicio,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        correoUsuario: req.body.correoUsuario,
        correoProveedor: req.body.correoProveedor,
        estado: req.body.estado,
        aprobar: req.body.aprobar,
        calificado: req.body.calificado
    });

    nueva_factura.save((err, factura_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar la factura.",
                err
            });
        } else {
            res.json({
                msj: "La factura se registró exitosamente.",
                factura_db

            });
            mailer.enviar_mail(factura_db.correoProveedor, factura_db.correoUsuario);
        }
    });
});

router.get('/listar-factura', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Factura.find((err, lista_factura) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las facturas.",
                err
            });
        } else {
            res.json({ lista_factura })
        }
    })
});
router.put('/activar-servicio', (req, res) => {
    Factura.updateOne({
        _id: req.body._id
    }, {
        $set: {
            estado: 'Completado'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del servicio.",
                err
            });
        } else {
            res.json({
                msj: "El servicio ha sido completado.",
                info
            })
        }
    });

});

router.put('/desactivar-servicio', (req, res) => {
    Factura.updateOne({
        _id: req.body._id
    }, {
        $set: {
            estado: 'No Completado'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del servicio.",
                err
            });
        } else {
            res.json({
                msj: "El servicio no ha sido completado.",
                info
            })
        }
    });

});
router.put('/aceptar-servicio', (req, res) => {
    Factura.updateOne({
        _id: req.body._id
    }, {
        $set: {
            aprobar: "Aceptada"
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del servicio.",
                err
            });
        } else {
            res.json({
                msj: "El servicio ha sido aceptado.",
                info
            })
        }
    });

});

router.put('/calificar-servicio', (req, res) => {
    Factura.updateOne({
        _id: req.body._id
    }, {
        $set: {
            calificado: "Calificado"
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del servicio.",
                err
            });
        } else {
            res.json({
                msj: "El servicio ha sido calificado.",
                info
            })
        }
    });

});

//Funcion para aceptar una reserva
router.put('/rechazar-servicio', (req, res) => {
    Factura.updateOne({
        _id: req.body._id
    }, {
        $set: {
            aprobar: "Rechazada"
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del servicio.",
                err
            });
        } else {
            res.json({
                msj: "El servicio ha sido rechazado.",
                info
            })
        }
    });
});
module.exports = router;