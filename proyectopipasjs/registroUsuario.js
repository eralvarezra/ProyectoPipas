'use strict'
const nombreUsuario = document.querySelector('#nombre');
const apellidoUsuario = document.querySelector("#apellidos");
const identificacionUsuario = document.querySelector("#identificacion");
const fechaNacimientoUsuario = document.querySelector("#fechaNacimiento");
const provinciasUsuario = document.querySelector("#provincias");
const cantonesUsuario = document.querySelector("#cantones");
const distritosUsuario = document.querySelector("#distritos");
const generoUsuario = document.querySelector("#genero");
const cantidadMascotaUsuario = document.querySelector("#cantidadMascota");
const telefonoContactoUsuario = document.querySelector("#telefonoContacto");
const correoElectronicoUsuario = document.querySelector("#correoElectronico");
const condicionesUsuario = document.querySelector('#condiciones');
const botonEnviar = document.querySelector("#btnSubmit");

const obtenerDatos = () => {
    let nombre = nombreUsuario.value;
    let apellidos = apellidoUsuario.value;
    let identificacion = identificacionUsuario.value;
    let fechaNacimiento = fechaNacimientoUsuario.value;
    let provincia = provinciasUsuario.value;
    let canton = cantonesUsuario.value;
    let distrito = distritosUsuario.value;
    let genero = generoUsuario.value;
    let cantidadMascota = cantidadMascotaUsuario.value;
    let telefonoContacto = telefonoContactoUsuario.value;
    let correoElectronico = correoElectronicoUsuario.value;

    document.cookie = "tipoperfil=U";
    document.cookie = "nombreUsuario =" + nombre;
    document.cookie = "apellidos=" + apellidos;
    document.cookie = "identificacionUsuario =" + identificacion;
    document.cookie = "fechaNacimiento=" + fechaNacimiento;
    document.cookie = "provinciaUsuario=" + provincia;
    document.cookie = "cantonUsuario=" + canton;
    document.cookie = "distritoUsuario=" + distrito;
    document.cookie = "genero=" + genero;
    document.cookie = "cantidadMascota=" + cantidadMascota;
    document.cookie = "telefonoUsuario=" + telefonoContacto;
    document.cookie = "correo=" + correoElectronico;
    document.cookie = "password=" + "contraSena22!";

    console.log('El nombre del usuario es es: ' + nombre);
    console.log('Los apellidos del usuario es es: ' + apellidos);
    console.log('La cédula del usuario es es: ' + identificacion);
    console.log('La fecha de Nacimiento del usuario es es: ' + fechaNacimiento);
    console.log('La Provincia es: ' + provincia);
    console.log('El Canton es: ' + canton);
    console.log('El Distrito es: ' + distrito);
    console.log('El genero es: ' + genero);
    console.log('Cantidad de mascotas: ' + cantidadMascota);
    console.log('Eltelefono del usuario es : ' + telefonoContacto);
    console.log('El correo electronico  del usuario es : ' + correoElectronico);
    Swal.fire({
        'icon': 'success',
        'title': 'Hemos recibido su solicitud de registro',
        'text': 'Le estaremos enviando un correo electrónico con la confirmación'
    }).then(() => {
        limpiar();
    });
}
const limpiar = () => {
    nombreUsuario.value = "";
    apellidoUsuario.value = "";
    identificacionUsuario.value = "";
    provinciasUsuario.value = "";
    cantonesUsuario.value = "";
    distritosUsuario.value = "";
    generoUsuario.value = "";
    fechaNacimientoUsuario.value = "";
    telefonoContactoUsuario.value = "";
    correoElectronicoUsuario.value = "";
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
    if (!regExp_formatoTelefono.test(telefonoContactoUsuario.value)) {
        error = true;
        telefonoContactoUsuario.classList.add('error-input');
    } else {
        telefonoContactoUsuario.classList.remove('error-input');
    }
    let regExp_formatoEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp_formatoEmail.test(correoElectronicoUsuario.value)) {
        error = true;
        correoElectronicoUsuario.classList.add('error-input');
    } else {
        correoElectronicoUsuario.classList.remove('error-input');
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

const btnAgregar = document.getElementById("btnAgregar");
const btnRemover = document.getElementById("btnRemover");

const btpAgregar = document.getElementById("btpAgregar");
const btpRemover = document.getElementById("btpRemover");

const btvAgregar = document.getElementById("btvAgregar");
const btvRemover = document.getElementById("btvRemover");

botonEnviar.addEventListener('click', validar);