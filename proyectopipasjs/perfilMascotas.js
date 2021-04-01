'use strict';

var cantidadMascotas = 3;
var counter = 1;

function agregarCampos() {
    for (counter = 1; counter < cantidadMascotas; counter++) {
        var newFields = document.getElementById('btn-mascota').cloneNode(true);
        newFields.id = 'btn-mascota' + counter;
        newFields.style.display = 'inline-block';
        document.getElementById("agregarAca").appendChild(newFields);
    }
}

window.onload = agregarCampos;