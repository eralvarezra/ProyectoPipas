'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");

//Tabla dinamica
const mostrar_usuario = async() => {
    let lista_usuario = await listar_usuario();
    tabla.innerHTML = '';

    lista_usuario.forEach((usuario) => {

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = usuario.nombre;

    });
};

const mostrar_mascota = async() => {
    let lista_mascota = await listar_mascotas();
    tabla.innerHTML = '';

    lista_mascota.forEach((mascota) => {

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = mascota.tipoRaza;
        fila.insertCell().innerHTML = mascota.nombreMascota;
        fila.insertCell().innerHTML = mascota.tipoMascota;
        fila.insertCell().innerHTML = mascota.caracteristicaEspecial;
        fila.insertCell().innerHTML = mascota.tipoPadecimiento;
        fila.insertCell().innerHTML = mascota.tipoVacuna;

    });
};


mostrar_usuario();
mostrar_mascota();