'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const mostrar_modal_editar = async(metodo) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar metodo de pago',
        html: `
            <div>
                <label for="txt-nombre">Nombre:</label>
                <input type="text" id="txt-general" required class="swal2-input" value="${metodo.nombreMetodo}">
                </select>
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                metodo._id,
                document.querySelector('#txt-general').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Está seguro que desea modificar el método de pago?',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            modificar_metodo(formValues[0], formValues[1]);
        }
    }
}
const mostrar_modal_eliminar = async(metodo) => {

        if (metodo) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea modificar el método de pago?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                eliminar_metodo(metodo._id);
            }
        }
    }
    //Tabla dinamica
const mostrar_metodo = async() => {
    let lista_metodos = await listar_metodos();
    console.log(lista_metodos);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_metodos.forEach((metodo) => {
        console.log(metodo);
        if (metodo.nombreMetodo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = (metodo.nombreMetodo);
            fila.insertCell().innerHTML = (metodo.fechaCreacion);
            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(metodo);
            })
            celda_editar.appendChild(boton_editar);

            //Eliminar
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")

            celda_eliminar.appendChild(boton_eliminar);

            celda_eliminar.addEventListener('click', async() => {
                mostrar_modal_eliminar(metodo)
            });
        }
    });
};

mostrar_metodo();

input_filtro.addEventListener('keyup', mostrar_metodo);