'use strict';

const btnHistorialServicios = document.getElementById("btn-HistorialServicios");
const btnDatosPerfil = document.getElementById("btn-DatosPerfil");
const btnPerfilMascotas = document.getElementById("btn-PerfilMascotas");
const btnVerFacturas = document.getElementById("btn-VerFacturas");
const btnlogout = document.getElementById("btn-logout");
const btnMascotas = document.querySelector("#btn-PerfilMascotas");
const btnAgregarServicios = document.querySelector('#btn-AgregarServicios');
const labelMascotas = document.querySelector("#labelMisMascotas");
const labelAgregarServicios = document.querySelector('#labelAgregarServicios');


// esto es para leer cookies
const mostrar = () => {
    let tipoPerfil = readCookie("tipoPerfil");
    tipoPerfil = tipoPerfil.replace("=", "");

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

const cerrarSesion = () => {
    let tipoPerfil = "";
    document.cookie = "tipoPerfil=" + tipoPerfil;
    deleteAllCookies();
    Swal.fire({
        'icon': 'success',
        'title': 'Hasta Pronto',
        'text': 'PETLOVER a su servicio'
    }).then(() => {
        location.href = 'inicio-sesion.html';
    });
}

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

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
btnHistorialServicios.addEventListener('click', () => {
    location.href = "confighistorial.html";
})

btnDatosPerfil.addEventListener('click', () => {
    let tipoPerfil = readCookie("tipoPerfil");
    tipoPerfil = tipoPerfil.replace("=", "");
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
    location.href = "facturas.html";
});

btnlogout.addEventListener('click', cerrarSesion);

window.onload = mostrar;