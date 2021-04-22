'use strict';
const btnlogout2 = document.getElementById("btn-logout");

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

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

btnlogout2.addEventListener('click', cerrarSesion);