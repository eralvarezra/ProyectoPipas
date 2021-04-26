'use strict'
let cookies2 = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));

let correoCookie = cookies2.correo;
console.log(correoCookie);
//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies2.correo;
const input_filtro = document.querySelector("#txt-filtro").value;
//obteniendo los elementos de HTML
//Filtro


//Tabla dinamica
const mostrar_factura = async() => {
    let lista_factura = await listar_factura();
    console.log(lista_factura);
    tabla.innerHTML = '';
    let filtro = cookies2.correo;
    lista_factura.forEach((factura) => {
        console.log(factura.correoUsuario)

        if ((factura.correoUsuario == filtro)) {
            console.log(factura);
            let boton_editar = document.createElement('button');

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;
            fila.insertCell().innerHTML = factura.descripcion;
            fila.insertCell().innerHTML = factura.precio;
            fila.insertCell().innerHTML = factura.aprobar;

        }
    });
};
const documentar_empresa = async(pFactura) => {
    document.cookie = "empresa=" + pFactura.nombreEmpresa;
    location.href = "calificarServicios.html"
}

mostrar_factura();

input_filtro.addEventListener(mostrar_factura);