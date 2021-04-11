'use strict';

const nombreMascotaU = document.querySelector('#nombreMascota');
const tipoMascotaU = document.querySelector('#tipoCaracteristica');
const razaMascota = document.querySelector('#tipoRaza');
const caracteristicaEspecialMascota = document.querySelector('#caracteristicaEspecial');
const caracteristicaPadecimientoMascota = document.querySelector('#tipoPadecimiento');
const caracteristicaVacunaMascota = document.querySelector('#tipoVacuna');
const botonNueva = document.querySelector('#btnNueva');
const botonEliminar = document.querySelector('#btnEliminar');
const botonEnviar = document.querySelector('#btnGuardar');
const botonConfirmar = document.querySelector("#btnConfirmar");
const botonVolver = document.querySelector("#btnVolver");
const popupConfirmar = document.querySelector("#sct-EliminarMascota");

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

const inicializar_perfil = () => {
    let correo = readCookie("correo");
    let lista_actual = document.getElementById('nombreMascota');
    let listaMascotas = obtener_mascotas();
    console.log(listaMascotas);
    console.log(lista_actual);
    console.log(correo);


}

const obtenerDatos = () => {
    let nombreMascota = nombreMascotaU.value;
    let tipoMascota = tipoMascotaU.value;
    let raza = razaMascota.value;
    let caracteristicaEspecial = caracteristicaEspecialMascota.value;
    let caracteristicaPadecimiento = caracteristicaPadecimientoMascota.value;
    let caracteristicaVacuna = caracteristicaVacunaMascota.value;
    console.log('El  nombre de la mascota es : ' + nombreMascota);
    console.log('El  tipo de mascota es : ' + tipoMascota);
    console.log('La raza de la mascota es : ' + raza);
    console.log('Las caracteristicas especiales de las mascotas son : ' + caracteristicaEspecial);
    console.log('Los padecimientos de las mascota son  : ' + caracteristicaPadecimiento);
    console.log('Las vacunas de las mascota son  : ' + caracteristicaVacuna);
    Swal.fire({
        'icon': 'success',
        'title': 'Éxito!',
        'text': 'Su cambio a sido guardado exitosamente'
    });
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

    })
    if (error == false) {
        obtenerDatos();
    }
}

const btnAgregar = document.getElementById("btnAgregar");
const btnRemover = document.getElementById("btnRemover");

const btpAgregar = document.getElementById("btpAgregar");
const btpRemover = document.getElementById("btpRemover");

const btvAgregar = document.getElementById("btvAgregar");
const btvRemover = document.getElementById("btvRemover");

var counter = 0;
var counterp = 0;
var counterv = 0;

const nueva = () => {
    location.href = "verPerfilMascota.html";
}

const eliminar = () => {
    popupConfirmar.style.display = "block";

}
const volver = () => {
    popupConfirmar.style.display = "none"
}

const confirmar = () => {
    location.href = "perfil.html"
}

const agregarCampos = () => {
    if (counter < 6) {
        counter++;
        var newFields = document.getElementById('caracteristicaEspecial').cloneNode(true);
        newFields.id = 'caracteristicaEspecial' + counter;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "180px";
        document.querySelector("#div-Form").style.height = "1420px";

        document.getElementById("selectTipoCaracteristica").appendChild(newFields);
    }
}

const agregarCamposP = () => {
    if (counterp < 8) {
        counterp++;
        var newFields = document.getElementById('tipoPadecimiento').cloneNode(true);
        newFields.id = 'tipoPadecimiento' + counterp;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "180px";
        document.querySelector("#div-Form").style.height = "1420px";

        document.getElementById("selectTipoPadecimiento").appendChild(newFields);
    }
}

const agregarCamposV = () => {
    if (counterv < 8) {
        counterv++;
        var newFields = document.getElementById('tipoVacuna').cloneNode(true);
        newFields.id = 'tipoVacuna' + counterv;
        newFields.style.display = 'block';
        newFields.style.textAlign = "center";
        newFields.style.marginLeft = "180px";
        document.querySelector("#div-Form").style.height = "1420px";

        document.getElementById("selectTipoVacuna").appendChild(newFields);
    }
}



const removerCampos = () => {
    if (counter > 0) {
        var item = document.getElementById("selectTipoCaracteristica").lastChild
        document.getElementById("selectTipoCaracteristica").removeChild(item);
        counter--;
    }
}

const removerCamposP = () => {
    if (counterp > 0) {
        var item = document.getElementById("selectTipoPadecimiento").lastChild
        document.getElementById("selectTipoPadecimiento").removeChild(item);
        counterp--;
    }
}

const removerCamposV = () => {
    if (counterv > 0) {
        var item = document.getElementById("selectTipoVacuna").lastChild
        document.getElementById("selectTipoVacuna").removeChild(item);
        counterv--;
    }
}

btnAgregar.addEventListener('click', agregarCampos);
btnRemover.addEventListener('click', removerCampos);

btpAgregar.addEventListener('click', agregarCamposP);
btpRemover.addEventListener('click', removerCamposP);

btvAgregar.addEventListener('click', agregarCamposV);
btvRemover.addEventListener('click', removerCamposV);

botonEnviar.addEventListener('click', validar);
botonNueva.addEventListener('click', nueva);
botonEliminar.addEventListener('click', eliminar);
botonConfirmar.addEventListener("click", confirmar)
botonVolver.addEventListener('click', volver);

window.onload = inicializar_perfil;