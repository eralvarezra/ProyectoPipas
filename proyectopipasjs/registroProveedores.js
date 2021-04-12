'use strict';
const tipoProveedorUsuario = document.querySelector("#tipoProveedor");
const tipoServicioUsuario = document.querySelector("#tipoServicio");
const tipoIdentificacionUsuario = document.querySelector("#tipoIdentificacion");
const pAcargoUsuario = document.querySelector("#pAcargo");
const empresaUsuario = document.querySelector("#empresa");
const contraEmpresaUsuario = document.querySelector("#contraEmpresa");
const telefonoUsuario = document.querySelector('#telefono');
const correoUsuario = document.querySelector('#correo');
const provinciasUsuario = document.querySelector('#provincias');
const cantonesUsuario = document.querySelector('#cantones');
const distritosUsuario = document.querySelector('#distritos');
const comentarioUsuario = document.querySelector('#comentarios');
const condicionesUsuario = document.querySelector('#condiciones');
const botonEnviar = document.querySelector('#btnSubmit');

const obtenerDatos = () => {
    let tipoProveedor = tipoProveedorUsuario.value;
    let tipoServicio = tipoServicioUsuario.value;
    let tipoIdentificacion = tipoIdentificacionUsuario.value;
    let usuarioAcargo = pAcargoUsuario.value;
    let empresa = empresaUsuario.value;
    let contraEmpresa = contraEmpresaUsuario.value;
    let telefono = telefonoUsuario.value;
    let correo = correoUsuario.value;
    let provincia = provinciasUsuario.value;
    let canton = cantonesUsuario.value;
    let distrito = distritosUsuario.value;
    let comentario = comentarioUsuario.value;
    let myFile = "www.laspatitas.com";
    let activo = false;


    console.log('El tipo proveedor es: ', tipoProveedor);
    console.log('El tipo de servicio es: ', tipoServicio);
    console.log('El tipo de identificación es: ', tipoIdentificacion);
    console.log('El nombre del usuario a cargo es: ' + usuarioAcargo);
    console.log('El nombre de la empresa es: ' + empresa);
    console.log('La contraseña de la empresa es: ' + contraEmpresa);
    console.log('El telefono de la empresa es: ' + telefono);
    console.log('El correo es: ' + correo);
    console.log('La Provincia es: ' + provincia);
    console.log('El Canton es: ' + canton);
    console.log('El Distrito es: ' + distrito);
    console.log('El Comentario es: ' + comentario);

    registrar_proveedor(tipoProveedor, tipoServicio, tipoIdentificacion, pAcargo, empresa, contraEmpresa, telefono, correo, provincia, canton, distrito, comentario, myFile, activo);

    Swal.fire({
        'icon': 'success',
        'title': 'Su mensaje ha sido enviado',
        'text': 'Nos pondremos en contacto con usted lo antes posible'
    }).then(() => {
        location.href = "../proyectopipashtml/registroProveedores.html";
        limpiar();
    });

}
const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    pAcargoUsuario.value = "";
    empresaUsuario.value = "";
    contraEmpresaUsuario.value = "";
    correoUsuario.value = "";
    telefonoUsuario.value = "";
    correoUsuario.value = "";
    comentarioUsuario.value = "";
    provinciasUsuario.value = "";
    cantonesUsuario.value = "";
    distritosUsuario.value = "";
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
    let regExp_formatoEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp_formatoEmail.test(correoUsuario.value)) {
        error = true;
        correoUsuario.classList.add('error-input');
    } else {
        correoUsuario.classList.remove('error-input');
    }
    let regExp_formatoContra = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{12,}$/;
    if (!regExp_formatoContra.test(contraEmpresaUsuario.value)) {
        error = true;
        contraEmpresaUsuario.classList.add('error-input');
    } else {
        contraEmpresaUsuario.classList.remove('error-input');
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


botonEnviar.addEventListener('click', validar, terminos);