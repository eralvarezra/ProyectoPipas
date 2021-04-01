'use strict';

function cambiarTipo() {
    var opcion = document.getElementById("tipoMascota");
    var mostrarTexto = opcion.options[opcion.selectedIndex].text;
    document.getElementById("agregarTipo").value = mostrarTexto;
}

function cambiarRaza() {
    var opcion1 = document.getElementById("raza");
    var mostrarTexto = opcion1.options[opcion1.selectedIndex].text;
    document.getElementById("agregarRaza").value = mostrarTexto;
}

function cambiarRazaCaracteristicasEspeciales() {
    var opcion = document.getElementById("caracteristicasEspeciales");
    var mostrarTexto = opcion.options[opcion.selectedIndex].text;
    document.getElementById("agregarCaracteristica").value = mostrarTexto;
}

function cambiarPadecimientos() {
    var opcion1 = document.getElementById("padecimientos");
    var mostrarTexto = opcion1.options[opcion1.selectedIndex].text;
    document.getElementById("agregarPadecimientos").value = mostrarTexto;
}

function cambiarVacunas() {
    var opcion1 = document.getElementById("vacunas");
    var mostrarTexto = opcion1.options[opcion1.selectedIndex].text;
    document.getElementById("agregarVacunas").value = mostrarTexto;
}

function cambiarMetodoPago() {
    var opcion1 = document.getElementById("metodoPago");
    var mostrarTexto = opcion1.options[opcion1.selectedIndex].text;
    document.getElementById("agregarMetodoPago").value = mostrarTexto;
}