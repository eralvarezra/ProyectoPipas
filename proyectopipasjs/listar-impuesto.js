'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro

const mostrar_modal_editar = async(impuesto) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar impuesto',
            html: `
            <div>
                <label for="txt-nombre">Monto:</label>
                <input type="number" id="txt-general" required class="swal2-input" value="${impuesto.nombreImpuesto}">
                </select>
            </div>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    impuesto._id,
                    document.querySelector('#txt-general').value,
                ]
            }
        });
        if (formValues) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea modificar el impuesto?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                modificar_impuesto(formValues[0], formValues[1]);
            }
        }
    }
    //Tabla dinamica
const mostrar_impuesto = async() => {
    let lista_impuesto = await listar_impuesto();
    console.log(lista_impuesto);
    tabla.innerHTML = '';

    lista_impuesto.forEach((impuesto) => {
        console.log(impuesto);
        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = impuesto.nombreImpuesto;
        fila.insertCell().innerHTML = impuesto.fechaCreacion;
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.classList.add("far")
        boton_editar.classList.add("fa-edit")
        boton_editar.type = 'button';

        boton_editar.addEventListener('click', async() => {
            mostrar_modal_editar(impuesto);
        })
        celda_editar.appendChild(boton_editar);

    });
};

mostrar_impuesto();

input_filtro.addEventListener('keyup', mostrar_impuesto);