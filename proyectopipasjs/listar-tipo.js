'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const mostrar_modal_editar = async(tipo) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Tipo',
            html: `
            <div>
                <label for="txt-nombre">Nombre:</label>
                <input type="text" id="txt-general" required class="swal2-input" value="${tipo.nombreTipo}">
                </select>
            </div>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    tipo._id,
                    document.querySelector('#txt-general').value,
                ]
            }
        });
        if (formValues) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: 'Está seguro que desea modificar el tipo',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                modificar_tipo(formValues[0], formValues[1]);
            }
        }
    }
    //Tabla dinamica
const mostrar_tipo = async() => {
    let lista_tipo = await listar_tipo();
    console.log(lista_tipo);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_tipo.forEach((tipo) => {
        console.log(tipo);
        if (tipo.nombreTipo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = tipo.nombreTipo;

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(tipo);
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
                eliminar_tipo(tipo._id)
            });
        }
    });
};

mostrar_tipo();

input_filtro.addEventListener('keyup', mostrar_tipo);