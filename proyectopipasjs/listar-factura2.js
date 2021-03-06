'use strict'
let cookies2 = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
console.log(cookies2.correo);

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies2.correo;
//obteniendo los elementos de HTML
//Filtro

//Tabla dinamica
const mostrar_factura = async() => {
    let lista_factura = await listar_factura();
    console.log(lista_factura);
    tabla.innerHTML = '';
    let filtro = cookies2.correo;
    console.log(filtro)

    lista_factura.forEach((factura) => {
        if (factura.correoProveedor == filtro) {
            console.log(factura.correoProveedor)
            console.log(factura);
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;
            fila.insertCell().innerHTML = factura.descripcion;
            fila.insertCell().innerHTML = factura.precio;
            fila.insertCell().innerHTML = factura.correoUsuario;
        }
    });
};
mostrar_factura();