'use strict';

const tipoServicioUsuario = document.querySelector("#tipoServicio");
const horasServicio = document.querySelector("#horas");
const botonEnviar = document.querySelector('#btnSubmit')

const obtenerDatos = () => {
    let tipoServicio = tipoServicioUsuario.value;
    let horas = horasServicio.value;

    console.log('El tipo de servicio es: ', tipoServicio);
    console.log('Las horas seleccionadas son: ', horas);

    Swal.fire({
        'icon': 'success',
        'title': 'Su servicio ha sido configurado',
        'text': 'Ahora finalizara haciendo el pago del servicio'
    }).then(() => {
        limpiar();
    });
}

const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    horasServicio.value = "";
    location.href = "../proyectopipashtml/formPago.html";
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

    let regExp_formatoHoras = /^([1-9]{1}|1[0-2]){1}$/;
    if (!regExp_formatoHoras.test(horasServicio.value)) {
        error = true;
        horas.classList.add('error-input');
    } else {
        horas.classList.remove('error-input');
    }

    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su solicitud',
            'text': 'Por favor revise los campos resaltados'
        });
    }

}
botonEnviar.addEventListener('click', validar);