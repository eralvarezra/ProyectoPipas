'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_comentario = async() => {
    let lista_comentario = await listar_calificacion();
    tabla.innerHTML = '';

    lista_comentario.forEach((comentario) => {
        console.log(comentario);

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = comentario.nombreProveedor;
        fila.insertCell().innerHTML = comentario.comentario;
        fila.insertCell().innerHTML = comentario.calificacion;


    });
};

mostrar_comentario();