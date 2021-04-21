'use strict';

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