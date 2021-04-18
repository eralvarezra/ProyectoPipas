'use strict';

const nombreMascotaU = document.querySelector('#nombreMascota');
const tipoMascotaU = document.querySelector('#tipoCaracteristica');
const razaMascota = document.querySelector('#tipoRaza');
const caracteristicaEspecialMascota = document.querySelector('#caracteristicaEspecial');
const caracteristicaPadecimientoMascota = document.querySelector('#tipoPadecimiento');
const caracteristicaVacunaMascota = document.querySelector('#tipoVacuna');
const tabla = document.getElementById('tabladinamica');
const btnAgregar = document.getElementById("btn-agregar");
const btnModificar = document.getElementById("btn-modificar");
const btnVolver = document.getElementById("btn-volver");

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

const mostrar_mascotas = async() => {
    let lista_mascota = await listar_mascotas();
    let filtro = readCookie("correo");
    filtro = filtro.replace("=", "");
    console.log(lista_mascota, filtro);
    tabla.innerHTML = '';

    lista_mascota.forEach((mascota) => {
        console.log(mascota);
        if (mascota.correo === filtro) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = (mascota.nombreMascota);
            fila.insertCell().innerHTML = (mascota.tipoMascota);
            fila.insertCell().innerHTML = (mascota.tipoRaza);
            fila.insertCell().innerHTML = (mascota.fotoMascota);
            fila.insertCell().innerHTML = (mascota.caracteristicaEspecial);
            fila.insertCell().innerHTML = (mascota.tipoPadecimiento);
            fila.insertCell().innerHTML = (mascota.tipoVacuna);

            //Eliminar
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")
            boton_eliminar.classList.add("btn-eliminar")

            celda_eliminar.appendChild(boton_eliminar);
        }
    });
}

btnAgregar.addEventListener('click', () => {
    location.href = "registroMascota.html"

});

btnVolver.addEventListener('click', () => {
    location.href = "perfil.html"

});

mostrar_mascotas();