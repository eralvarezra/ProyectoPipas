'use strict'
let cookies2 = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));

let correoCookie = cookies2.correo;
console.log(correoCookie);
//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies2.correo;
const input_filtro = document.querySelector("#txt-filtro").value;
//obteniendo los elementos de HTML
//Filtro


//Tabla dinamica
const mostrar_factura = async() => {
    let lista_factura = await listar_factura();
    console.log(lista_factura);
    tabla.innerHTML = '';
    let filtro = cookies2.correo;
    lista_factura.forEach((factura) => {
        console.log(factura.correoUsuario)

        if ((factura.correoUsuario == filtro) && (factura.estado == "Completado") && (factura.calificado == "No calificado") && (factura.aprobar == "Aceptada")) {
            console.log(factura);
            let boton_editar = document.createElement('button');

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;
            fila.insertCell().innerHTML = factura.descripcion;
            fila.insertCell().innerHTML = factura.precio;
            fila.insertCell().innerHTML = factura.aprobar;
            let celda_editar2 = fila.insertCell();

            boton_editar.classList.add("fas");
            boton_editar.classList.add("fa-dog");
            boton_editar.style.backgroundColor = "#e69138"
            boton_editar.type = 'button';
            celda_editar2.appendChild(boton_editar);
            boton_editar.addEventListener("click", async() => {
                calificar_servicio(factura._id, factura.calificado);
                documentar_empresa(factura);
            });

        }
    });
};
const documentar_empresa = async(pFactura) => {
    document.cookie = "empresa=" + pFactura.nombreEmpresa;
    location.href = "calificarServicios.html"
}


mostrar_factura();

//input_filtro.addEventListener('keyup', mostrar_factura);