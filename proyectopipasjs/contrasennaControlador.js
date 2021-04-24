//Implementar el modo estricto en todos los JS
'use strict';

//Referencia de los campos HTMLs. (Elementos como tal, no su valor)
const input_contrasena = document.querySelector('#txt-contrasena');
const input_contrasena_confirmacion = document.querySelector('#txt-confirmar-contrasena');
const boton_modificar = document.querySelector('#btn-modificar');

//Funcion que permite validar los datos requeridos
const validar = () => {
    let error = false;

    //Valida si los campos requeridos estan vacios
    let campos_requeridos = document.querySelectorAll(':required');
    campos_requeridos.forEach(campo => {
        //validar vacio
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });

    if (input_contrasena.value != input_contrasena_confirmacion.value) {
        error = true;
        input_contrasena_confirmacion.classList.add('error-input');
    } else {
        input_contrasena_confirmacion.classList.remove('error-input');
    }

    //Si no hubo ningún error, continuar con el proceso. Si hubo error, mostrar un mensaje.
    if (error == false) {
        guardar_info();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo ingresar',
            'text': 'Por favor revise los campos resaltados'
        });
    }
}

//Ejemplo para guardar datos en el local storage
const guardar_info = () => {
    //Obtiene los parametros del URL
    let parametros = location.search.slice(1).split("&");
    if (parametros != undefined) {
        if (parametros.length > 0) {
            let name = location.search.slice(1).split("&")[0].split("=")[1];
            actualizar_contrasena(name, input_contrasena.value);
        }
    }
}

//Limpiar los campos de la pantalla
const limpiar_pantalla = () => {
    input_contrasena.value = '';
    input_contrasena_confirmacion.value = '';
}

//Agregar el evento al boton
boton_modificar.addEventListener('click', validar);


const pre_procesamiento = () => {
    //llamar al servicio obtener el estados del usuario
    //valiudar ese estado, si es 1 continue, sino que tire un alerta y no deje ahcer nada.
}
pre_procesamiento();