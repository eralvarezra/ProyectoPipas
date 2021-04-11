'use strict'
const nombreUsuario = document.querySelector('#nombre');
const apellidoUsuario = document.querySelector("#apellidos");
const tipoIdentificacionUsuario = document.querySelector("#tipoIdentificacion");
const identificacionUsuario = document.querySelector("#identificacion");
const fechaNacimientoUsuario = document.querySelector("#fechaNacimiento");
const provinciasUsuario = document.querySelector("#provincias");
const cantonesUsuario = document.querySelector("#cantones");
const distritosUsuario = document.querySelector("#distritos");
const generoUsuario = document.querySelector("#genero");
const cantidadMascotaUsuario = document.querySelector("#cantidadMascota");
const telefonoContactoUsuario = document.querySelector("#telefonoContacto");
const correoElectronicoUsuario = document.querySelector("#correo");
const numeroTarjetaUsuario = document.querySelector("#numTarjeta");
const fechaVencimientoUsuario = document.querySelector("#fechaVencimiento");
const fotoUsuario = document.querySelector("#img-foto");
const condicionesUsuario = document.querySelector('#condiciones');
const botonEnviar = document.querySelector("#btnSubmit");

const obtenerDatos = () => {
    let nombre = nombreUsuario.value;
    let apellidos = apellidoUsuario.value;
    let tipoIdentificacion = tipoIdentificacionUsuario.value;
    let identificacion = identificacionUsuario.value;
    let fechaNacimiento = fechaNacimientoUsuario.value;
    let provincia = provinciasUsuario.value;
    let canton = cantonesUsuario.value;
    let distrito = distritosUsuario.value;
    let genero = "femenino";
    let cantidadMascota = cantidadMascotaUsuario.value;
    let telefono = telefonoContactoUsuario.value;
    let correo = correoElectronicoUsuario.value;
    let numTarjeta = numeroTarjetaUsuario.value;
    let vencimiento = fechaVencimientoUsuario.value;
    let foto = "www.foto.com";

    registrar_usuario(nombre, apellidos, tipoIdentificacion, identificacion, fechaNacimiento, provincia, canton, distrito, genero, cantidadMascota, telefono, correo, numTarjeta, vencimiento, foto);

    console.log(nombre, apellidos, tipoIdentificacion, identificacion, fechaNacimiento, provincia, canton, distrito, genero, cantidadMascota, telefono, correo, numTarjeta, vencimiento, foto);
};


// enviar_informacion(nombre, apellidos, tipoIdentificacion, identificacion, fechaNacimiento, provincia, canton, distrito, genero, cantidadMascota,
//     telefono, correo, numTarjeta, vencimiento, foto);

// registrar_usuario(nombre, apellidos, tipoIdentificacion, identificacion, fechaNacimiento, provincia, canton, distrito, genero, cantidadMascota,
//     telefono, correo, numTarjeta, vencimiento, foto);


// console.log(nombre, apellidos, tipoIdentificacion, identificacion, fechaNacimiento, provincia, canton, distrito, genero, cantidadMascota,
//     telefono, correo, numTarjeta, vencimiento, foto);

// Swal.fire({
//     'icon': 'success',
//     'title': 'Hemos recibido su solicitud de registro',
//     'text': 'Le estaremos enviando un correo electrónico con la confirmación'
// }).then(() => {
//     limpiar();
// });

const limpiar = () => {
    nombreUsuario.value = '';
    apellidoUsuario.value = ''
    tipoIdentificacionUsuario.value = ''
    identificacionUsuario.value = ''
    provinciasUsuario.value = ''
    cantonesUsuario.value = ''
    distritosUsuario.value = ''
    generoUsuario.value = ''
    fechaNacimientoUsuario.value = ''
    telefonoContactoUsuario.value = ''
    correoElectronicoUsuario.value = ''
    numeroTarjetaUsuario.value = ''
    fechaVencimientoUsuario.value = ''
};

const validar = () => {
    let error = false;
    let campos_requeridos = document.querySelectorAll(':required');

    campos_requeridos.forEach(campo => {
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });
    let regExp_formatoTelefono = /^[0-9]{4}\-[0-9]{4}$/;
    if (!regExp_formatoTelefono.test(telefonoContactoUsuario.value)) {
        error = true;
        telefonoContactoUsuario.classList.add('error-input');
    } else {
        telefonoContactoUsuario.classList.remove('error-input');
    }
    let regExp_formatoEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp_formatoEmail.test(correoElectronicoUsuario.value)) {
        error = true;
        correoElectronicoUsuario.classList.add('error-input');
    } else {
        correoElectronicoUsuario.classList.remove('error-input');
    }
    let regExp_numeroTarjeta = /4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}/;
    if (!regExp_numeroTarjeta.test(numeroTarjetaUsuario.value)) {
        error = true;
        numeroTarjetaUsuario.classList.add('error-input');
    } else {
        numeroTarjetaUsuario.classList.remove('error-input');
    }

    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje',
            'text': 'Por favor revise los campos resaltados'
        });
    }

};


const btvAgregar = document.getElementById("btvAgregar");
const btvRemover = document.getElementById("btvRemover");

botonEnviar.addEventListener('click', validar);