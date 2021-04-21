'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_proveedor = async() => {
    let lista_proveedor = await listar_proveedor();
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();
    lista_proveedor.forEach((proveedor) => {
        console.log(proveedor);

        if (proveedor.tipoServicio.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = proveedor.empresa;
            fila.insertCell().innerHTML = proveedor.correo;
            fila.insertCell().innerHTML = proveedor.pAcargo;
            fila.insertCell().innerHTML = proveedor.telefono;
            fila.insertCell().innerHTML = proveedor.tipoServicio;
            fila.insertCell().innerHTML = proveedor.tipoIdentificacion;
        }

    });
};

mostrar_proveedor();

input_filtro.addEventListener('keyup', mostrar_proveedor);