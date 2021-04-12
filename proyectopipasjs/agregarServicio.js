'use strict';
const input_nombre = document.getElementById('txt-nombre');
var input_correo = document.getElementById('txt-correo');
const input_numprecio = document.getElementById('num-precio');
const input_detalleServicio = document.getElementById('txt-detalleServicio');
const input_costoServicioXhora = document.getElementById('num-costoServcioXhora');
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

const cookieCorreo = () => {
    let correoCookie = readCookie("correo");
    correoCookie = correoCookie.replace("=", "");
    input_correo.value = correoCookie;
}

const enviar_informacion = async() => {
    let pNombreServicio = input_nombre.value;
    let pCorreo = input_correo.value;
    let pPrecio = input_numprecio.value;
    let pDetalleServicio = input_detalleServicio.value;
    let pCostoServicioXhora = input_costoServicioXhora.value;
    let pFechaCreacion = input_fecha;
    pFechaCreacion = new Date();
    console.log(pNombreServicio, pCorreo, pPrecio, pDetalleServicio, pCostoServicioXhora, pFechaCreacion);
    await registrar_servicio(pNombreServicio, pCorreo, pPrecio, pDetalleServicio, pCostoServicioXhora, pFechaCreacion);
    location.href = "../proyectopipashtml/listarServicio.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/listarServicio.html"
});

window.onload = cookieCorreo();