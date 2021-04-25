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
        activo: req.body.activo,
        estado: req.body.estado
    });

    nuevo_proveedor.save((err, proveedor_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar su perfil.",
                err
            });

        } else {
            res.json({
                msj: "Su información de perfil se guardó exitosamente.",
                proveedor_db
            });
        }
    });

});

router.get('/listar-proveedor', (req, res) => {
    RegistroProveedor.find((err, lista_proveedor) => {
        if (err) {
            res.json({
                msj: "No se pudo encontrar su perfil.",
                err
            });

        } else {
            res.json({ lista_proveedor });
        }
    });

});
router.put('/modificar-proveedor', (req, res) => {
    RegistroProveedor.updateOne({
        _id: req.body._id
    }, {
        $set: {
            tipoServicio: req.body.tipoServicio,
            pAcargo: req.body.pAcargo,
            empresa: req.body.empresa,
            telefono: req.body.telefono
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la información.",
                err
            });
        } else {
            res.json({
                msj: "la información fue modificada exitosamente.",
                info
            })
        }
    });
});
router.put('/activar-proveedor', (req, res) => {
    RegistroProveedor.updateOne({
        _id: req.body._id
    }, {
        $set: {
            activo: 'Activo'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del proveedor.",
                err
            });
        } else {
            res.json({
                msj: "El proveedor ha sido activado.",
                info
            })
        }
    });

});

router.put('/desactivar-proveedor', (req, res) => {
    RegistroProveedor.updateOne({
        _id: req.body._id
    }, {
        $set: {
            activo: 'Inactivo'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del proveedor.",
                err
            });
        } else {
            res.json({
                msj: "El proveedor ha sido desactivado.",
                info
            })
        }
    });

});
router.put('/aceptar-proveedor', (req, res) => {
    RegistroProveedor.updateOne({
        _id: req.body._id
    }, {
        $set: {
            estado: "Aceptada"
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del proveedor.",
                err
            });
        } else {
            res.json({
                msj: "El proveedor ha sido aceptado.",
                info
            })
        }
    });

});

//Funcion para aceptar una reserva
router.put('/rechazar-proveedor', (req, res) => {
    RegistroProveedor.updateOne({
        _id: req.body._id
    }, {
        $set: {
            estado: "Rechazada"
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del proveedor.",
                err
            });
        } else {
            res.json({
                msj: "El proveedor ha sido rechazado.",
                info
            })
        }
    });
});
module.exports = router;