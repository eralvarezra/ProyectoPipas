'use strict'

const nombreUsuario = document.querySelector('#nombreUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const correoUsuario = document.querySelector('#correoUsuario');
const comentarioUsuario = document.querySelector('#comentarioUsuario');
const btn = document.querySelector('.btn');
//const botonlimpiar = document.querySelector('#botonlimpiar');//

const obtenerDatos = () => {

    let telefono = telefonoUsuario.value;
    let correo = correoUsuario.value;
    let comentario = comentarioUsuario.value;
    let nombre = nombreUsuario.value;


    console.log('El telefono de la empresa es: ' + telefono);
    console.log('El correo es: ' + correo);
    console.log('El comentario es: ' + comentario);
    console.log('El nombre de la persona es: ' + nombre);


    Swal.fire({
        'icon': 'success',
        'title': 'Su mensaje ha sido enviado.',
        'text': 'Nos pondremos en contacto con usted lo antes posible.'

    }).then(() => {
        limpiar();
    });
}

const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo

    correoUsuario.value = "";
    telefonoUsuario.value = "";
    nombreUsuario.value = "";
    comentarioUsuario.value = "";
}

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
    if (!regExp_formatoTelefono.test(telefonoUsuario.value)) {
        error = true;
        telefonoUsuario.classList.add('error-input');
    } else {
        telefonoUsuario.classList.remove('error-input');
    }
    let regExp_formatoEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp_formatoEmail.test(correoUsuario.value)) {
        error = true;
        correoUsuario.classList.add('error-input');
    } else {
        correoUsuario.classList.remove('error-input');
    }
    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje.',
            'text': 'Por favor revise los campos resaltados.'
        });
    }

}
btn.addEventListener('click', validar);

const pre_procesamiento = () => {
    //llamar al servicio obtener el estados del usuario
    //valiudar ese estado, si es 1 continue, sino que tire un alerta y no deje ahcer nada.
}
pre_procesamiento();