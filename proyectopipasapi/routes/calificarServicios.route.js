'use strict';

const express = require('express');
const router = express.Router();
// se crea primero el model
const calificarServicio = require('../models/calificarServicios.model')
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

})

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