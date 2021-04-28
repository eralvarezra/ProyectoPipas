'use strict'

const nombreUsuario = document.querySelector('#nombreUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const correoUsuario = document.querySelector('#correoUsuario');
const comentarioUsuario = document.querySelector('#comentarioUsuario');
const btn = document.querySelector('.btn');
//const botonlimpiar = document.querySelector('#botonlimpiar');//

// agregar cookie

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

const obtenerNombre = async(pcorreo) => {
    let lista_proveedor = await listar_proveedor();
    let nombreProveedor = "";
    let lista_usuario = await obtener_login_usuario();

    lista_proveedor.forEach((proveedor) => {

        if (proveedor.correo == pcorreo) {
            nombreProveedor = proveedor.pAcargo;

        }
    });

    lista_usuario.forEach((usuario) => {

        if (usuario.correo == pcorreo) {
            nombreProveedor = usuario.nombre;

        }
    });
    return nombreProveedor;
}

const obtenerDatos = async() => {
    let correo = readCookie('correo');
    correo = correo.replace("=", "");
    console.log(correo);

    let telefono = telefonoUsuario.value;
    let comentario = comentarioUsuario.value;

    let nombreCliente = await obtenerNombre(correo);


    console.log('El telefono de la empresa es: ' + telefono);
    console.log('El correo es: ' + correo);
    console.log('El comentario es: ' + comentario);
    console.log(nombreCliente);

    obtenerFormulario(nombreCliente, telefono, correo, comentario);

    Swal.fire({
        'icon': 'success',
        'title': 'Su mensaje ha sido enviado.',
        'text': 'Nos pondremos en contacto con usted lo antes posible.'

    }).then(() => {
        limpiar();
    });
}

const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo

    telefonoUsuario.value = "";
    comentarioUsuario.value = "";
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
    let regExp_formatoTelefono = /^[0-9]{4}\-[0-9]{4}$/;
    if (!regExp_formatoTelefono.test(telefonoUsuario.value)) {
        error = true;
        telefonoUsuario.classList.add('error-input');
    } else {
        telefonoUsuario.classList.remove('error-input');
    }

    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje.',
            'text': 'Por favor revise los campos resaltados.'
        });
    }

}
btn.addEventListener('click', validar);