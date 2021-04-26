'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

//Tabla dinamica
const mostrar_mascota = async() => {
    let lista_mascotas = await listar_mascotas();
    console.log(lista_mascotas);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_mascotas.forEach((mascota) => {
        console.log(mascota);
        if (mascota.tipoRaza.toUpperCase().includes(filtro)) {
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = mascota.nombreMascota;
            fila.insertCell().innerHTML = mascota.tipoMascota;
            fila.insertCell().innerHTML = mascota.tipoRaza;
        }
    });
};

mostrar_mascota();
input_filtro.addEventListener('keyup', mostrar_mascota);