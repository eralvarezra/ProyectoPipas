'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const mostrar_modal_editar = async(vacuna) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar vacuna',
        html: `
            <div>
                <label for="txt-nombre">Nombre:</label>
                <input type="text" id="txt-general" required class="swal2-input" value="${vacuna.nombreVacuna}">
                </select>
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                vacuna._id,
                document.querySelector('#txt-general').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: '¿Está seguro que desea modificar la vacuna?',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            modificar_vacuna(formValues[0], formValues[1]);
        }
    }
}
const mostrar_modal_eliminar = async(vacuna) => {

        if (vacuna) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea eliminar la vacuna?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                eliminar_vacuna(vacuna._id);
            }
        }
    }
    //Tabla dinamica
const mostrar_vacuna = async() => {
    let lista_vacunas = await listar_vacunas();
    console.log(lista_vacunas);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_vacunas.forEach((vacuna) => {
        console.log(vacuna);
        if (vacuna.nombreVacuna.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = vacuna.nombreVacuna;
            fila.insertCell().innerHTML = vacuna.fechaCreacion;

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(vacuna);
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
                mostrar_modal_eliminar(vacuna)
            });
        }
    });
};

mostrar_vacuna();

input_filtro.addEventListener('keyup', mostrar_vacuna);