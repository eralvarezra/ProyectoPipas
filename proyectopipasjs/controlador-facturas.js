'use strict';

let empresaProveedor = document.querySelector("#nombreEmpresa");
let descripcion = document.querySelector("#descripcionServicio");
let servicioPrecio = document.querySelector("#precioServicio");
let nombreDelServicio = document.querySelector("#nombreServicio");
let fechavencimientotarjeta = document.querySelector("#fechaVencimiento");
let numerodelatarjeta = document.querySelector("#numTarjeta");
let impuestoHtml = document.querySelector('#impuesto');
let facturaTotal = document.querySelector("#facturaTotal");

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

const mostrar_detallesfactura = async() => {
    let idFactura = readCookie("id_servicio");
    idFactura = idFactura.replace('=', '');
    let lista_facturas = await listar_factura();
    let lista_usuarios = await listar_usuario();
    let impuesto = 0;
    impuesto = await listar_impuesto();
    let cliente = readCookie('correo');
    cliente = cliente.replace('=', '');
    let detalleServicio;
    let costoServicio;
    let nombreProveedor;
    let tipodelServicio;

    lista_facturas.forEach((factura) => {
        if (idFactura === factura._id) {
            nombreProveedor = factura.nombreEmpresa;
            costoServicio = factura.precio;
            detalleServicio = factura.descripcion;
            tipodelServicio = factura.tipoServicio;
        }
    });

    lista_usuarios.forEach((usuario) => {
        if (cliente === usuario.nombre)
            cliente = usuario.nombre + " " + usuario.apellido;
        numerodelatarjeta.value = usuario.numeroTarjeta;
        numerodelatarjeta.innerHTML = usuario.numeroTarjeta;

    });

    impuesto = impuesto[0].nombreImpuesto;
    impuestoHtml.innerHTML = impuesto * 100;
    facturaTotal.innerHTML = parseFloat(costoServicio) + (parseFloat(impuesto) * 100);

    descripcion.value = detalleServicio;
    descripcion.innerHTML = detalleServicio;
    servicioPrecio.innerHTML = costoServicio;
    empresaProveedor.value = nombreProveedor;
    empresaProveedor.innerHTML = nombreProveedor;
    nombreDelServicio.value = tipodelServicio;
    nombreDelServicio.innerHTML = tipodelServicio;
}

mostrar_detallesfactura();