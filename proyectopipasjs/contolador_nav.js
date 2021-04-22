'use strict';
const btnlogout = document.getElementById("btn-logout");

let cookies = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
console.log(cookies[1]);
const enlaces = document.querySelectorAll('#nav-principal a');
let tipoUsuario = cookies[1];
console.log(tipoUsuario);
switch (tipoUsuario) {
    case 'P':
        enlaces[2].classList.add('ocultar');
        enlaces[4].classList.add('ocultar');
        break;
    case 'U':
        enlaces[4].classList.add('ocultar');
        enlaces[5].classList.add('ocultar');
        break;
    case 'A':
        enlaces[0].classList.add('ocultar');
        enlaces[1].classList.add('ocultar');
        enlaces[2].classList.add('ocultar');
        enlaces[3].classList.add('ocultar');
        break;
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

btnlogout.addEventListener('click', cerrarSesion);