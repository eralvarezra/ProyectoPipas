'use strict';
const nombreMascotaU = document.querySelector('#nombreMascota');
const tipoMascotaU = document.querySelector('#tipoMascota');
const tipoRazaM = document.querySelector('#tipoRaza');
const fotoMascota = document.querySelector("#img-foto");
const botonEnviar = document.querySelector("#btnEnviar");
const btnVolver = document.getElementById("btnVolver");

function readCookie(pCookie) {
    const nameString = pCookie + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    } else {
        return ""
    }
}

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

    let div_imagen = document.createElement('div');
    div_imagen.classList.add('contenedor-imagen"');

    let imagen = document.createElement('img-foto');
    imagen.src = mascota.imagen;

}

const obtenerDatos = () => {
    let nombreMascota;
    let tipoMascota;
    let raza;
    let foto;

    nombreMascota = nombreMascotaU.value;
    tipoMascota = tipoMascotaU.value;
    raza = tipoRazaM.value;
    foto = fotoMascota.src;


    let correo = readCookie("correo");
    correo = correo.replace("=", "");

    registrar_mascota(nombreMascota, tipoMascota, raza, foto, correo);
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
            'title': 'No se pudo enviar su mensaje.',
            'text': 'Por favor revise los campos resaltados.'
        });
    }
}

botonEnviar.addEventListener('click', validar);

btnVolver.addEventListener('click', () => {
    location.href = "verPerfilMascota.html"

});
mostrar_selects();