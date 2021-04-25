'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const mostrar_modal_editar = async(raza) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Raza',
        html: `
            <div>
                <label for="txt-nombre">Nombre:</label>
                <input type="text" id="txt-general" required class="swal2-input" value="${raza.nombreRaza}">
                </select>
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                raza._id,
                document.querySelector('#txt-general').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Está seguro que desea modificar la raza de la mascota?',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            modificar_raza(formValues[0], formValues[1]);
        }
    }
}
const mostrar_modal_eliminar = async(raza) => {

        if (raza) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea eliminar la raza?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                eliminar_raza(raza._id);
            }
        }
    }
    //Tabla dinamica
const mostrar_raza = async() => {
    let lista_razas = await listar_razas();
    console.log(lista_razas);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_razas.forEach((raza) => {
        console.log(raza);
        if (raza.nombreRaza.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = raza.nombreRaza;
            fila.insertCell().innerHTML = raza.fechaCreacion;

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(raza);
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
                mostrar_modal_eliminar(raza);
            });
        }
    });
};

mostrar_raza();

input_filtro.addEventListener('keyup', mostrar_raza);