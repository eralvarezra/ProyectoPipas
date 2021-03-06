'use strict';
const nombreServicio = document.getElementById('txt-nombre');
const nombreTipo = document.getElementById('txt-tipo');
const input_correo = document.getElementById('txt-correo');
const input_numprecio = document.getElementById('num-precio');
const input_detalleServicio = document.getElementById('txt-detalleServicio');
const input_costoServicioXhora = document.getElementById('num-costoServicioXhora');
var input_fecha = document.getElementById('txt-fechaCreacion');
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');

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


const cargar_servicios = async() => {
    let lista_tipoServicio = await listar_tipoServicio();
    console.log(lista_tipoServicio)

    lista_tipoServicio.forEach((servicio) => {
        let temporal = servicio.nombreServicio;
        let newoption = document.createElement('option');
        newoption.innerHTML = temporal;
        newoption.value = temporal;
        nombreServicio.appendChild(newoption);
    });
}
const cargar_tipoMascota = async() => {
    let lista_tipo = await listar_tipo();
    console.log(lista_tipo)

    lista_tipo.forEach((tipo) => {
        let temporal = tipo.nombreTipo;
        let newoption = document.createElement('option');
        newoption.innerHTML = temporal;
        newoption.value = temporal;
        nombreTipo.appendChild(newoption);
    });
}

const cookieCorreo = () => {
    let correoCookie = readCookie("correo");
    correoCookie = correoCookie.replace("=", "");
    input_correo.value = correoCookie;
}
const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    nombreServicio.value = "";
    nombreTipo.value = "";
    input_numprecio.value = "";
    nombreTipo.value = "";
    input_detalleServicio.value = "";
    input_costoServicioXhora.value = "";
}
const enviar_informacion = async() => {
    let pNombreServicio = nombreServicio.value;
    let pCorreo = input_correo.value;
    let ptipoMascota = nombreTipo.value;
    let pPrecio = input_numprecio.value;
    let pDetalleServicio = input_detalleServicio.value;
    let pCostoServicioXhora = input_costoServicioXhora.value;
    let pFechaCreacion = input_fecha;
    pFechaCreacion = new Date();
    console.log(pNombreServicio, pCorreo, ptipoMascota, pPrecio, pDetalleServicio, pCostoServicioXhora, pFechaCreacion);
    await registrar_servicio(pNombreServicio, pCorreo, ptipoMascota, pPrecio, pDetalleServicio, pCostoServicioXhora, pFechaCreacion);

    then(() => {
        limpiar();
        location.href = "../proyectopipashtml/listarServicio.html";
    });
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
            enviar_informacion();
        }
    });
}

btnAgregar.addEventListener('click', validar);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/listarServicio.html"
});

window.onload = cookieCorreo();
window.onload = cargar_servicios();
window.onload = cargar_tipoMascota();