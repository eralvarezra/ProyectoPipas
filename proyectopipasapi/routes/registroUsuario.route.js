'use strict';

const express = require('express');
// Redirige las peticiones, inputs o punto de llegada. Va a ser igual al router de express(express denos un router)
const router = express.Router();
// Uselo para el modelo comentarios, NO lleva el js
const Usuario = require('../models/registroUsuario.model');

//Endpoint para registrar comentarios
router.post('/registrar-usuario', (req, res) => {
    let nuevo_usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        tipoIdentificacion: req.body.tipoIdentificacion,
        identificacion: req.body.identificacion,
        fechaNacimiento: req.body.fechaNacimiento,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        genero: req.body.genero,
        cantidadMascotas: req.body.cantidadMascotas,
        telefono: req.body.telefono,
        correo: req.body.correo,
        numeroTarjeta: req.body.numeroTarjeta,
        fechaVencimiento: req.body.fechaVencimiento,
        foto: req.body.foto,
        estado: 'Pendiente',
        activo: 'Activo',
        contrasena: crear_constrasena_aleatoria(),
        categoria: '1'
    });

    nuevo_usuario.save((err, usuario_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el usuario",
                err
            });
        } else {
            res.json({
                msj: "El usuario se registró exitosamente.",
                usuario_db
            });
            mailer.enviar_email(`${usuario_db.nombre} ${usuario_db.apellidos}`, usuario_db.correo)
        }
    });
});

const crear_constrasena_aleatoria = () => {
    var nueva_contrasena = '';
    //Crea una variable con los posibles caracteres aceptados dentro de la contrasenna
    var posibles_caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' + '0123456789@#$';

    let numero_aleatorio;
    for (let i = 1; i <= 8; i++) {
        //Creo un numero aleatorio
        numero_aleatorio = Math.random();
        //lo multiplico por la cantidad de valores posibles + 1 y devuelve el numero entero sin decimales
        var posicion_caracter = Math.floor(numero_aleatorio *
            posibles_caracteres.length + 1);
        //Tomo el caracter que este en esta posicion
        nueva_contrasena += posibles_caracteres.charAt(posicion_caracter)
    }
    //retorno la contraseña de 8 caracteres
    return nueva_contrasena;
}

router.get('/buscar-por-correo-usuario', (req, res) => {
    let correo = req.query.correo;
    Usuario.findOne({ correo: correo }, (err, usuario_db) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ usuario_db })
        }
    })
});


router.put('/modificar-contrasena', (req, res) => {
    Usuario.updateOne({
        _id: req.body._id
    }, {
        $set: {
            contrasena: req.body.contrasena,
            categoria: '2'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la contraseña del usuario",
                err
            });
        } else {
            res.json({
                msj: "La contraseña fue modificada exitosamente",
                info
            })
        }
    });
});

router.get('/listar-usuario', (req, res) => {
    //Funcionalidad, obtener lista
    //find: sacar datos de una coleccion
    Usuario.find((err, lista_usuario) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_usuario })
        }
    })
});
router.put('/activar-usuario', (req, res) => {
    Usuario.updateOne({
        _id: req.body._id
    }, {
        $set: {
            activo: 'Activo'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del usuario",
                err
            });
        } else {
            res.json({
                msj: "El usuario ha sido activado",
                info
            })
        }
    });

});
router.put('/modificar-usuario', (req, res) => {
    Usuario.updateOne({
        _id: req.body._id
    }, {
        $set: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            genero: req.body.genero,
            identificacion: req.body.identificacion,
            numeroTarjeta: req.body.numeroTarjeta,
            fechaVencimiento: req.body.fechaVencimiento
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar la información",
                err
            });
        } else {
            res.json({
                msj: "la información fue modificada exitosamente",
                info
            })
        }
    });
});
router.put('/desactivar-usuario', (req, res) => {
    Usuario.updateOne({
        _id: req.body._id
    }, {
        $set: {
            activo: 'Inactivo'
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: "No se pudo modificar el estado del usuario",
                err
            });
        } else {
            res.json({
                msj: "El usuario ha sido desactivado",
                info
            })
        }
    });

});



//Luego se va al server.js

module.exports = router;