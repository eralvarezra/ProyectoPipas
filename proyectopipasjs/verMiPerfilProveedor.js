'use strict';

const btnAgregar = document.getElementById("btnAgregar");
const btnRemover = document.getElementById("btnRemover");

var counter = 0;


function agregarCampos() {
    if (counter < 4) {
        counter++;
        var newFields = document.getElementById('tipoServicio').cloneNode(true);
        newFields.id = 'tipoServicio' + counter;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "105px";

        document.getElementById("selectTipoServicio").appendChild(newFields);
    }
}

function removerCampos() {
    if (counter > 0) {
        var item = document.getElementById("selectTipoServicio").lastChild
        document.getElementById("selectTipoServicio").removeChild(item);
        counter--;
    }
}

btnAgregar.addEventListener('click', agregarCampos);
btnRemover.addEventListener('click', removerCampos);