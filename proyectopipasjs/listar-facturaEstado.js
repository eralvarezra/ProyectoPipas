'use strict'
let cookies2 = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
console.log(cookies2.correo);

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies2.correo;
const input_filtro = document.querySelector("#txt-filtro").value;
//obteniendo los elementos de HTML
//Filtro

const mostrar_modal_cambiar_estado = async(factura) => {

        if (factura) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea completar el servicio?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                cambiar_estado2(factura._id, factura.estado);
            }
        }
    }
    //Tabla dinamica
const mostrar_factura = async() => {
    let lista_factura = await listar_factura();
    console.log(lista_factura);
    tabla.innerHTML = '';
    let filtro = cookies2.correo;
    lista_factura.forEach((factura) => {
        console.log(factura.correoProveedor)
        if ((factura.correoProveedor == filtro) && (factura.aprobar == "Aceptada")) {
            console.log(factura);
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;
            fila.insertCell().innerHTML = factura.descripcion;
            fila.insertCell().innerHTML = factura.precio;
            fila.insertCell().innerHTML = factura.correoUsuario;
            fila.insertCell().innerHTML = factura.estado;

            let celda_cambiar_estado = fila.insertCell();
            let boton_cambiar_estado = document.createElement('button');
            boton_cambiar_estado.type = 'button';
            if (factura.estado.toUpperCase() != "COMPLETADO") {
                boton_cambiar_estado.innerHTML = 'Completar';
                boton_cambiar_estado.classList.add("far")
                boton_cambiar_estado.classList.add("fa-check-circle")
            } else {
                boton_cambiar_estado.innerHTML = 'No completar';
                boton_cambiar_estado.classList.add("far")
                boton_cambiar_estado.classList.add("fa-times-circle")
            }

            celda_cambiar_estado.appendChild(boton_cambiar_estado);

            boton_cambiar_estado.addEventListener('click', async() => {
                mostrar_modal_cambiar_estado(factura)
            });
        }


    });
};

mostrar_factura();

input_filtro.addEventListener('keyup', mostrar_factura);