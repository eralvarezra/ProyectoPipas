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

const mostrar_modal_aprobar_estado = async(factura) => {

    if (factura) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Está seguro que desea aceptar el servicio del usuario?',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            aprobar_estado(factura._id, true);
        }
    }
}
const mostrar_modal_rechazar_estado = async(factura) => {

        if (factura) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea rechazar el servicio del usuario?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                aprobar_estado(factura._id, false);
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
        if (factura.correoProveedor == filtro) {
            console.log(factura);
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;
            fila.insertCell().innerHTML = factura.descripcion;
            fila.insertCell().innerHTML = factura.precio;
            fila.insertCell().innerHTML = factura.correoUsuario;
            fila.insertCell().innerHTML = factura.aprobar;

            if (factura.aprobar.toUpperCase() != "PENDIENTE") {
                let celda_vacia = fila.insertCell();
            } else {
                let celda_cambiar_estado = fila.insertCell();
                let boton_activar = document.createElement('button');
                boton_activar.innerHTML = 'Aceptar';
                boton_activar.type = 'button';
                boton_activar.classList.add("far")
                boton_activar.classList.add("fa-check-circle")
                celda_cambiar_estado.appendChild(boton_activar);
                let boton_rechazar = document.createElement('button');
                boton_rechazar.innerHTML = 'Rechazar';
                boton_rechazar.type = 'button';
                boton_rechazar.classList.add("far")
                boton_rechazar.classList.add("fa-times-circle")
                celda_cambiar_estado.appendChild(boton_rechazar);

                boton_activar.addEventListener('click', async() => {
                    mostrar_modal_aprobar_estado(factura);
                });

                boton_rechazar.addEventListener('click', async() => {
                    mostrar_modal_rechazar_estado(factura);
                });
            }
        }


    });
};

mostrar_factura();

input_filtro.addEventListener('keyup', mostrar_factura);