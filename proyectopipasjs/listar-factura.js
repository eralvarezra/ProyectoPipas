'use strict'
let cookies2 = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
console.log(cookies2);

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies2.correo;
const input_filtro = document.querySelector("#txt-filtro");
//obteniendo los elementos de HTML
//Filtro


//Tabla dinamica
const mostrar_factura = async() => {
    let lista_factura = await listar_factura();
    console.log(lista_factura);
    tabla.innerHTML = '';

    lista_factura.forEach((factura) => {
        if (factura.correo == filtro) {
            console.log(factura);
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;
            fila.insertCell().innerHTML = factura.descripcion;
            fila.insertCell().innerHTML = factura.precio;
        }
    });
};

mostrar_factura();

input_filtro.addEventListener('keyup', mostrar_factura);