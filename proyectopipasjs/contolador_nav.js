'use strict';

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
let tipoPerfil = readCookie('tipoPerfil');
tipoPerfil = tipoPerfil.replace("=", "");
console.log(tipoPerfil);
const enlaces = document.querySelectorAll('#nav-principal a');
let tipoUsuario = tipoPerfil;
console.log(tipoUsuario);
switch (tipoUsuario) {
    case 'P':
        enlaces[2].classList.add('ocultar');
        enlaces[4].classList.add('ocultar');
        enlaces[6].classList.add('ocultar');
        break;
    case 'U':
        enlaces[4].classList.add('ocultar');
        enlaces[5].classList.add('ocultar');
        enlaces[6].classList.add('ocultar');
        break;
    case 'A':
        enlaces[0].classList.add('ocultar');
        enlaces[1].classList.add('ocultar');
        enlaces[2].classList.add('ocultar');
        enlaces[3].classList.add('ocultar');
        enlaces[6].classList.add('ocultar');

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