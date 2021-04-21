'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const mostrar_modal_eliminar = async(comentario) => {

        if (comentario) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: 'Está seguro que desea eliminar el comentario',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                eliminar_comentario(comentario._id);
            }
        }
    }
    //Tabla dinamica
const mostrar_comentario = async() => {
    let lista_comentario = await listar_calificacion();
    console.log(lista_comentario);

    let filtro = input_filtro.value.toUpperCase();
    tabla.innerHTML = '';
    lista_comentario.forEach((comentario) => {
        console.log(comentario);
        if (comentario.nombreProveedor.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = comentario.nombreProveedor;
            fila.insertCell().innerHTML = comentario.comentario;
            fila.insertCell().innerHTML = comentario.calificacion;

            //ELIMINAR:
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")

            celda_eliminar.appendChild(boton_eliminar);

            celda_eliminar.addEventListener('click', async() => {
                mostrar_modal_eliminar(comentario);
            });
        }
    });
};

mostrar_comentario();

input_filtro.addEventListener('keyup', mostrar_comentario);