'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const AgregarServicio = require('../models/agregarServicio.model');

//Endpoint para registrar comentarios
router.post('/registrar-servicio', (req, res) => {
    let nueva_registrarServicio = new AgregarServicio({
        nombreServicio: req.body.nombreServicio,
        correo: req.body.correo,
        tipoMascota: req.body.tipoMascota,
        precio: req.body.precio,
        detalleServicio: req.body.detalleServicio,
        costoServicioXhora: req.body.costoServicioXhora,
        fechaCreacion: req.body.fechaCreacion
    });

    nueva_registrarServicio.save((err, registrarServicio) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el dato",
                err
            });
        } else {
            res.json({
                msj: "El dato se registró exitosamente.",
                registrarServicio
            })
        }
    });
});

router.get('/listar-servicio', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    AgregarServicio.find((err, lista_servicio) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los servicios",
                err
            });
        } else {
            res.json({ lista_servicio })
        }
    })
});

router.put('/modificar-servicio', (req, res) => {
    AgregarServicio.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombreServicio: req.body.nombreServicio,
            correo: req.body.correo,
            precio: req.body.precio,
            detalleServicio: req.body.detalleServicio,
            costoServicioXhora: req.body.costoServicioXhora,
            fechaCreacion: req.body.fechaCreacion
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el Servicio.",
                err
            });
        } else {
            res.json({
                msj: "El servicio fue modificado exitosamente.",
                info
            })
        }
    });
});
router.delete('/eliminar-Servicio', (req, res) => {
    let _id = req.body._id;
    AgregarServicio.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el servicio.',
                err
            });
        } else {
            res.json({
                msj: 'El Servicio se eliminó correctamente.'
            });
        }
    });
});
//Luego se va al server.js
module.exports = router;