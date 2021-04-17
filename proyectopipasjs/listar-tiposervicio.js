'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const mostrar_modal_editar = async(servicio) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Servicio',
        html: `
            <div>
                <label for="txt-nombre">Nombre:</label>
                <input type="text" id="txt-general" required class="swal2-input" value="${servicio.nombreServicio}">
                </select>
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                servicio._id,
                document.querySelector('#txt-general').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: 'Está seguro que desea modificar el servicio',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            modificar_tipoServicio(formValues[0], formValues[1]);
        }
    }
}
const mostrar_modal_eliminar = async(servicio) => {

        if (servicio) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: 'Está seguro que desea eliminar el tipo de servicio',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                eliminar_servicio(servicio._id);
            }
        }
    }
    //Tabla dinamica
const mostrar_tipoServicio = async() => {
    let lista_tipoServicio = await listar_tipoServicio();
    console.log(lista_tipoServicio);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_tipoServicio.forEach((servicio) => {
        console.log(servicio);
        if (servicio.nombreServicio.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = servicio.nombreServicio;
            fila.insertCell().innerHTML = servicio.fechaCreacion;

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(servicio);
            })
            celda_editar.appendChild(boton_editar);

            //ELIMINAR:
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")

            celda_eliminar.appendChild(boton_eliminar);

            celda_eliminar.addEventListener('click', async() => {
                mostrar_modal_eliminar(servicio)
            });
        }
    });
};

mostrar_tipoServicio();

input_filtro.addEventListener('keyup', mostrar_tipoServicio);