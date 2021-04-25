'use strict';
const nombreMascotaU = document.querySelector('#nombreMascota');
const tipoMascotaU = document.querySelector('#tipoMascota');
const tipoRazaM = document.querySelector('#tipoRaza');
const botonEnviar = document.querySelector("#btnEnviar");
const btnVolver = document.getElementById("btnVolver");

const mostrar_selects = async() => {
    let listado = await listar_tipo();

    listado.forEach((tipo) => {
        let temporal = document.createElement('option');
        temporal.innerHTML = tipo.nombreTipo;
        temporal.value = tipo.nombreTipo;
        tipoMascotaU.appendChild(temporal);
    });

    listado = await listar_razas();
    listado.forEach((raza) => {
        let temporal = document.createElement('option');
        temporal.innerHTML = raza.nombreRaza;
        temporal.value = raza.nombreRaza;
        tipoRazaM.appendChild(temporal);
    });

}

const obtenerDatos = () => {
    var seccion_mascota;
    let nombreMascota;
    let tipoMascota;
    let raza;
    for (let i = 0; i <= counterv; i++) {
        if (i == 0) {
            seccion_mascota = document.getElementById('selectFormulario');
        } else {
            seccion_mascota = document.getElementById('selectFormulario' + i);
        }
        nombreMascota = seccion_mascota.querySelector('#nombreMascota').value;
        tipoMascota = seccion_mascota.querySelector('#tipoMascota').value;
        raza = seccion_mascota.querySelector('#tipoRaza').value;

        console.log(`El  nombre de la mascota es : ${nombreMascota}. El  tipo de mascota es : ${tipoMascota}. La raza de la mascota es : ${raza}. Las caracteristicas especiales de las mascotas son : ${caracteristicaEspecial}. Los padecimientos de las mascota son  : ${caracteristicaPadecimiento}. Las vacunas de las mascota son  : ${caracteristicaVacuna}.`);
    }

    Swal.fire({
        'icon': 'success',
        'title': 'Su mensaje ha sido enviado',
        'text': 'Nos pondremos en contacto con usted lo antes posible'
    }).then(() => {
        limpiar();
    });
}

const limpiar = () => {
    nombreMascotaU.value = "";
    tipoMascotaU.value = "";
    tipoRazaM.value = "";
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
    let regExp_formatoNombre = /^[A-z]+$/;
    if (!regExp_formatoNombre.test(nombreMascotaU.value)) {
        error = true;
        nombreMascotaU.classList.add('error-input');
    } else {
        nombreMascotaU.classList.remove('error-input');
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
}

botonEnviar.addEventListener('click', validar);

btnVolver.addEventListener('click', () => {
    location.href = "perfil.html"

});
mostrar_selects();