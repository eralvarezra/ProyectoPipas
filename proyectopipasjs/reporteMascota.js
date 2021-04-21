'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_mascota = async() => {
    let lista_mascotas = await listar_mascotas();
    tabla.innerHTML = '';

    lista_mascotas.forEach((mascota) => {
        console.log(mascota);

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = mascota.nombreMascota;
        fila.insertCell().innerHTML = mascota.tipoMascota;
        fila.insertCell().innerHTML = mascota.tipoRaza;
        fila.insertCell().innerHTML = mascota.caracteristicaEspecial;
        fila.insertCell().innerHTML = mascota.tipoPadecimiento;
        fila.insertCell().innerHTML = mascota.tipoVacuna;

    });
};

mostrar_mascota();