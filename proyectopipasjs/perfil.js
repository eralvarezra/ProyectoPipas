'use strict';

const btnHistorialServicios = document.getElementById("btn-HistorialServicios");
const btnDatosPerfil = document.getElementById("btn-DatosPerfil");
const btnPerfilMascotas = document.getElementById("btn-PerfilMascotas");
const btnVerFacturas = document.getElementById("btn-VerFacturas");
const btnlogout = document.getElementById("btn-logout");
const btnMascotas = document.querySelector("#btn-PerfilMascotas");
const labelMascotas = document.querySelector("#labelMisMascotas");


var tipoPerfil = "U";

function mostrar() {
    if (tipoPerfil == "U") {
        btnMascotas.style.display = "block";
        labelMascotas.style.display = "block";
    }
    if (tipoPerfil == "P") {
        btnMascotas.style.display = "none";
        labelMascotas.style.display = "none";
        btnlogout.style.marginTop = "175px";
    }
};

btnHistorialServicios.addEventListener('click', () => {
    location.href = "reportes.html";
})

btnDatosPerfil.addEventListener('click', () => {
    if (tipoPerfil == "U") {
        location.href = "verMiPerfilUsuario.html";
    }
    if (tipoPerfil == "P") {
        location.href = "verMiPerfilProveedor.html";
    }
});

btnPerfilMascotas.addEventListener('click', () => {
    location.href = "verPerfilMascota.html";

});

btnVerFacturas.addEventListener('click', () => {
    location.href = "reportes.html";
});

btnlogout.addEventListener('click', () => {
    cerrarSesion();
});

window.onload = mostrar;