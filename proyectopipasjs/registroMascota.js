'use strict';
const nombreMascotaU = document.querySelector('#nombreMascota');
const tipoMascotaU = document.querySelector('#tipoMascota');
const tipoRazaM = document.querySelector('#tipoRaza');
const caracteristicaEspecialM = document.querySelector('#caracteristicaEspecial');
const tipoPadecimientoM = document.querySelector('#tipoPadecimiento');
const tipoVacunaM = document.querySelector('#tipoVacuna');
const botonEnviar = document.querySelector("#btnSubmit");
const btnVolver = document.getElementById("btnVolver");

const obtenerDatos = () => {
    var seccion_mascota;
    let nombreMascota;
    let tipoMascota;
    let raza;
    let caracteristicaEspecial;
    let caracteristicaPadecimiento;
    let caracteristicaVacuna;
    for (let i = 0; i <= counterv; i++) {
        if (i == 0) {
            seccion_mascota = document.getElementById('selectFormulario');
        } else {
            seccion_mascota = document.getElementById('selectFormulario' + i);
        }
        nombreMascota = seccion_mascota.querySelector('#nombreMascota').value;
        tipoMascota = seccion_mascota.querySelector('#tipoMascota').value;
        raza = seccion_mascota.querySelector('#tipoRaza').value;
        caracteristicaEspecial = seccion_mascota.querySelector('#caracteristicaEspecial').value;
        caracteristicaPadecimiento = seccion_mascota.querySelector('#tipoPadecimiento').value;
        caracteristicaVacuna = seccion_mascota.querySelector('#tipoVacuna').value;

        console.log(`El  nombre de la mascota es : ${nombreMascota}. El  tipo de mascota es : ${tipoMascota}. La raza de la mascota es : ${raza}. Las caracteristicas especiales de las mascotas son : ${caracteristicaEspecial}. Los padecimientos de las mascota son  : ${caracteristicaPadecimiento}. Las vacunas de las mascota son  : ${caracteristicaVacuna}.`);
    }

    Swal.fire({
        'icon': 'success',
        'title': 'Su mensaje ha sido enviado',
        'text': 'Nos pondremos en contacto con usted lo antes posible'
    }).then(() => {
        limpiar();
    });
}

const limpiar = () => {
    nombreMascotaU.value = "";
    tipoMascotaU.value = "";
    tipoRazaM.value = "";
    caracteristicaEspecialM.value = "";
    tipoPadecimientoM.value = "";
    tipoVacunaM.value = "";
}
const validar = () => {
    let error = false;
    let campos_requeridos = document.querySelectorAll(':required');
    campos_requeridos.forEach(campo => {
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });
    let regExp_formatoNombre = /^[A-z]+$/;
    if (!regExp_formatoNombre.test(nombreMascotaU.value)) {
        error = true;
        nombreMascotaU.classList.add('error-input');
    } else {
        nombreMascotaU.classList.remove('error-input');
    }
    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje',
            'text': 'Por favor revise los campos resaltados'
        });
    }
}

botonEnviar.addEventListener('click', validar);

const btnAgregar = document.getElementById("btnAgregar");
const btnRemover = document.getElementById("btnRemover");

const btpAgregar = document.getElementById("btpAgregar");
const btpRemover = document.getElementById("btpRemover");

const btvAgregar = document.getElementById("btvAgregar");
const btvRemover = document.getElementById("btvRemover");

const btmAgregar = document.getElementById("btmAgregar");
const btmRemover = document.getElementById("btmRemover");

var counter = 0;
var counterp = 0;
var counterv = 0;
var counterm = 0;

function agregarCampos() {
    if (counter < 6) {
        counter++;
        var newFields = document.getElementById('caracteristicaEspecial').cloneNode(true);
        newFields.id = 'caracteristicaEspecial' + counter;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "200px";

        document.getElementById("selectTipoCaracteristica").appendChild(newFields);
    }
}

function agregarCamposP() {
    if (counterp < 8) {
        counterp++;
        var newFields = document.getElementById('tipoPadecimiento').cloneNode(true);
        newFields.id = 'tipoPadecimiento' + counterp;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "200px";

        document.getElementById("selectTipoPadecimiento").appendChild(newFields);
    }
}

function agregarCamposV() {
    if (counterv < 8) {
        counterv++;
        var newFields = document.getElementById('tipoVacuna').cloneNode(true);
        newFields.id = 'tipoVacuna' + counterv;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "200px";

        document.getElementById("selectTipoVacuna").appendChild(newFields);
    }
}

function removerCampos() {
    if (counter > 0) {
        var item = document.getElementById("selectTipoCaracteristica").lastChild
        document.getElementById("selectTipoCaracteristica").removeChild(item);
        counter--;
    }
}

function removerCamposP() {
    if (counterp > 0) {
        var item = document.getElementById("selectTipoPadecimiento").lastChild
        document.getElementById("selectTipoPadecimiento").removeChild(item);
        counterp--;
    }
}

function removerCamposV() {
    if (counterv > 0) {
        var item = document.getElementById("selectTipoVacuna").lastChild
        document.getElementById("selectTipoVacuna").removeChild(item);
        counterv--;
    }
}

function agregarCamposM() {
    if (counterv < 10) {
        counterv++;
        var newFields = document.getElementById('selectFormulario').cloneNode(true);
        newFields.id = 'selectFormulario' + counterv;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "200px";
        let id_padre = document.getElementById("selectFormulario").parentElement.id;
        let elemento_padre = document.getElementById(id_padre);
        elemento_padre.insertBefore(newFields, elemento_padre.children[elemento_padre.childElementCount - 1]);
    }
}

btnAgregar.addEventListener('click', agregarCampos);
btnRemover.addEventListener('click', removerCampos);

btpAgregar.addEventListener('click', agregarCamposP);
btpRemover.addEventListener('click', removerCamposP);

btvAgregar.addEventListener('click', agregarCamposV);
btvRemover.addEventListener('click', removerCamposV);

btmAgregar.addEventListener('click', agregarCamposM);
btmRemover.addEventListener('click', removerCamposM);

btnVolver.addEventListener('click', () => {
    location.href = "perfil.html"

});