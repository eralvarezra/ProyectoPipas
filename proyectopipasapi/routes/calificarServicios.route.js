'use strict';

const express = require('express');
const router = express.Router();
// se crea primero el model
const nueva_Calificacion = require('../models/calificarServicios.model')
    // metodos para extraer

// req = request res= response 
router.post('/calificar-servicio', (req, res) => {
    let nueva_Calificacion = new calificarServicio({
        nombreProveedor: req.body.nombreProveedor,
        comentario: req.body.comentario,
        calificacion: req.body.calificacion,
    });

    nueva_Calificacion.save((err, calificacion_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar calificación",
                err
            });

        } else {
            res.json({
                msj: "Su calificación se guardo exitosamente",
                calificacion_db
            });
        }
    });

});
router.delete('/eliminar-comentario', (req, res) => {
    let _id = req.body._id;
    nueva_Calificacion.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar el comentario',
                err
            });
        } else {
            res.json({
                msj: 'El comentario se eliminó correctamente'
            });
        }
    });
});
router.get('/listar-comentario', (req, res) => {
    nueva_Calificacion.find((err, lista_comentario) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });

        } else {
            res.json({ lista_comentario });
        }
    });

});

router.get('/listar-calificacion', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    calificarServicio.find((err, lista_calificacion) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las calificaciones",
                err
            });
        } else {
            res.json({ lista_calificacion })
        }
    })
});


module.exports = router;