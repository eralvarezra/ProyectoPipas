'use strict';

const comentario = document.getElementById("comentario");
const valor1 = document.getElementById("rate1");
const valor2 = document.getElementById("rate2");
const valor3 = document.getElementById("rate3");
const valor4 = document.getElementById("rate4");
const valor5 = document.getElementById("rate5");
const btnCalificar = document.getElementById("btn-Calificar");
const nombreProveedor = document.getElementById('nombreProveedor');

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

const mostrar_proveedor = async() => {
    let correo = readCookie("correo");
    correo = correo.replace("=", "");
    console.log(correo)
    let proveedores = await listar_proveedor();
    console.log(proveedores)
    proveedores.forEach((proveedor) => {
        if (proveedor.correo === correo) {
            document.getElementById('nombreProveedor').innerHTML = proveedor.empresa;
            document.getElementById('nombreProveedor').value = proveedor.empresa;
            document.getElementById('nombreProveedor').text = proveedor.empresa;
            console.log(proveedor.empresa)
        }
    });
}

const obtenerDatos = () => {
    let comentarioFinal = comentario.value;
    let valor;
    let correo = readCookie("correo");
    correo = correo.replace("=", "");

    if (document.getElementById("rate1").checked) {
        valor = document.getElementById("rate1").value;

    }
    if (document.getElementById("rate2").checked) {
        valor = document.getElementById("rate2").value;

    }
    if (document.getElementById("rate3").checked) {
        valor = document.getElementById("rate3").value;

    }
    if (document.getElementById("rate4").checked) {
        valor = document.getElementById("rate4").value;

    }
    if (document.getElementById("rate5").checked) {
        valor = document.getElementById("rate5").value;

    }

    console.log('El comentario es: ', comentarioFinal);
    console.log('La calificación es: ', valor);
    registrar_calificacion(correo, comentarioFinal, valor);
}

function habilitar() {
    if (self.checked) {
        btnCalificar.disabled = false;
    }
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

    let regExp_formatoEmail = /[0-9A-Za-záíéóú., ¡!¿?:;ñÑ]{7}/;
    if (!regExp_formatoEmail.test(comentario.value)) {
        error = true;
        comentario.classList.add('error-input');
    } else {
        comentario.classList.remove('error-input');
    }
    if (error == false) {
        obtenerDatos();

    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje',
            'text': 'Por favor revise los campos resaltados, e incluya un comentario.'
        });
    }

}


btnCalificar.addEventListener('click', validar);

window.onload = mostrar_proveedor();