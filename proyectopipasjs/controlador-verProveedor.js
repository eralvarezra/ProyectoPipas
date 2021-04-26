'use strict';

let empresaProveedor = document.querySelector("#nombreEmpresa");
let descripcion = document.querySelector("#descripcionServicio");
let servicioPrecio = document.querySelector("#precioServicio");
let nombreDelServicio = document.querySelector("#nomberServicio");
let fechavencimientotarjeta = document.querySelector("#fechaVencimiento");
let numerodelatarjeta = document.querySelector("#numTarjeta");
let codigodeSeguridad = document.querySelector("#cvv");
const botonEnviar = document.querySelector('#btnSubmit');

let cookiesCorreoEmpresa = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correoempresa]) => ({...accumulator, [key.trim()]: decodeURIComponent(correoempresa) }));
let cookiesNombreServicio = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, nombreServicio]) => ({...accumulator, [key.trim()]: decodeURIComponent(nombreServicio) }));
let cookiesCorreoUsuario = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
let cookiesNombreEmpresa = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, empresa]) => ({...accumulator, [key.trim()]: decodeURIComponent(empresa) }));
let cookiesDescripcion = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, descripcion]) => ({...accumulator, [key.trim()]: decodeURIComponent(descripcion) }));


let correoProveedorServicio = cookiesCorreoEmpresa.correoempresa;
let nombreServicioProveedor = cookiesNombreServicio.nombreServicio;
let correodelUsuario = cookiesCorreoUsuario.correo;
let nombredelaEmpresa = cookiesNombreEmpresa.empresa;
let descripciondelservicio = cookiesDescripcion.descripcion;
let preciodelservicio = '';
let estado = "No Completado";
let aprobar = "Pendiente";
let calificar = "No calificado"
const obtenerDatos = () => {
    let numerodelatarjetaUsuario = numerodelatarjeta.value;
    let fechavencimientotarjetaUsuario = fechavencimientotarjeta.value;
    let codigoUsuario = codigodeSeguridad.value;

    console.log('el numero de la tarjeta es: ', numerodelatarjetaUsuario);
    console.log('la fecha de vencimiento es: ', fechavencimientotarjetaUsuario);
    console.log('El codigo de seguridad es: ', codigoUsuario);


    console.log('El nombre de la empresa: ', nombredelaEmpresa);
    console.log('El nombre del servicio: ', nombreServicioProveedor);
    console.log('descripcion:', descripciondelservicio);
    console.log('precio: ', preciodelservicio);
    console.log('correo usuario: ', correodelUsuario);
    console.log('correo proveedor: ', correoProveedorServicio);
    registrar_factura(nombredelaEmpresa, nombreServicioProveedor, descripciondelservicio, preciodelservicio, correodelUsuario, correoProveedorServicio, estado, aprobar, calificar);

    Swal.fire({
        'icon': 'success',
        'title': 'Su servicio fue solicitado con éxito.',
        'text': 'El proveedor se comunicará contigo pronto.'
    });

}

function readCookie1(pCookie) {
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

const mostrar_servicio = async() => {
    let lista_servicio = await listar_servicio();
    console.log(lista_servicio);
    console.log(correoProveedorServicio);
    console.log(nombreServicioProveedor)
    lista_servicio.forEach((servicio) => {
        if ((servicio.correo == correoProveedorServicio) && (servicio.nombreServicio == nombreServicioProveedor)) {
            let precioServicio = servicio.precio;
            console.log(precioServicio);
            preciodelservicio = precioServicio;
            servicioPrecio.innerHTML = precioServicio;
        }
    });
};
const mostrar_pagoUsuario = async() => {
    let lista_usuario = await listar_usuario();
    console.log(lista_usuario);
    lista_usuario.forEach((usuario) => {
        if ((usuario.correo == correodelUsuario)) {
            let numerotarjeta = usuario.numeroTarjeta;
            console.log(numerotarjeta);
            numerodelatarjeta.value = numerotarjeta;
        }
    });
};

const nombredelServicio = () => {
    let nombreService = readCookie1('nombreServicio');
    nombreService = nombreService.replace("=", "");
    console.log(nombreService);
    nombreDelServicio.innerHTML = nombreService;
};

const nombre_Empresa = () => {
    let nombreEmpresa = readCookie1('empresa');
    nombreEmpresa = nombreEmpresa.replace("=", "");
    console.log(nombreEmpresa);
    empresaProveedor.innerHTML = nombreEmpresa;
};

const descricionServicio = () => {
    let descripcionServicio = readCookie1('descripcion');
    descripcionServicio = descripcionServicio.replace("=", "");
    console.log(descripcionServicio);
    descripcion.innerHTML = descripcionServicio;
};
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

    let regExp_formatofechaexpiracion = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/;
    if (!regExp_formatofechaexpiracion.test(fechavencimientotarjeta.value)) {
        error = true;
        fechavencimientotarjeta.classList.add('error-input');
    } else {
        fechavencimientotarjeta.classList.remove('error-input');
    }
    let regExp_formatocvv = /^[0-9]{3}/;
    if (!regExp_formatocvv.test(codigodeSeguridad.value)) {
        error = true;
        codigodeSeguridad.classList.add('error-input');
    } else {
        codigodeSeguridad.classList.remove('error-input');
    }
    if (error == false) {
        obtenerDatos();

    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo solicitar su servicio.',
            'text': 'Por favor revise los campos resaltados.'
        });
    }
}
botonEnviar.addEventListener('click', validar);
mostrar_pagoUsuario();
nombredelServicio();
mostrar_servicio();
nombre_Empresa();
descricionServicio();