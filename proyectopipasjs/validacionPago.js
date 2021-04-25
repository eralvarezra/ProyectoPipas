'use strict';
const nombreTarjeta = document.querySelector("#nomTarjeta");
const numeroTarjeta = document.querySelector("#numTarjeta");
const fechaVencimiento = document.querySelector("#fechaVencimiento");
const codigoTarjeta = document.querySelector("#codTarjeta");
const botonEnviar = document.querySelector('#btnSubmit');

const obtenerDatos = () => {
    let nomTarjeta = nombreTarjeta.value;
    let numTarjeta = numeroTarjeta.value;
    let vencimiento = fechaVencimiento.value;
    let codTarjeta = codigoTarjeta.value;

    console.log('El nombre en la tarjeta es: ', nomTarjeta);
    console.log('El número de tarjeta es: ', numTarjeta);
    console.log('La fecha de vencimiento de la tarjeta es; ', vencimiento);
    console.log('El codigo de verificación de la tarjeta es: ', codTarjeta);

    Swal.fire({
        'icon': 'success',
        'title': 'Su servicio ha sido solicitado.',
        'text': 'Ahora tendrá acceso a los datos del proveedor para que se ponga en contacto con él.'
    }).then(() => {
        limpiar();
    });
    location.href = "../proyectopipashtml/calificarServicios.html";
}

const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    nombreTarjeta.value = "";
    numeroTarjeta.value = "";
    fechaVencimiento.value = "";
    codigoTarjeta.value = "";
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


    let regExp_formatoNombre = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!regExp_formatoNombre.test(nombreTarjeta.value)) {
        error = true;
        nombreTarjeta.classList.add('error-input');
    } else {
        nombreTarjeta.classList.remove('error-input');
    }

    let regExp_numeroTarjeta = /4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}/;
    if (!regExp_numeroTarjeta.test(numeroTarjeta.value)) {
        error = true;
        numeroTarjeta.classList.add('error-input');
    } else {
        numeroTarjeta.classList.remove('error-input');
    }

    let regExp_formatoFechaVencimiento = /^((0[1-9])|(1[0-2]))\/((2009)|(20[1-2][0-9]))$/;
    if (!regExp_formatoFechaVencimiento.test(fechaVencimiento.value)) {
        error = true;
        fechaVencimiento.classList.add('error-input');
    } else {
        fechaVencimiento.classList.remove('error-input');
    }

    let regExp_formatoCodigoTarjeta = /^[0-9]{3}$/;
    if (!regExp_formatoCodigoTarjeta.test(codigoTarjeta.value)) {
        error = true;
        codigoTarjeta.classList.add('error-input');
    } else {
        codigoTarjeta.classList.remove('error-input');
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

botonEnviar.addEventListener('click', validar);