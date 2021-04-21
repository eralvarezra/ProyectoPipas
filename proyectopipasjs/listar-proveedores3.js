'use strict'

let cookies1 = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
console.log(cookies1.correo);

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies1.correo
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_modal_editar = async(proveedor) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Proveedor',
        html: `
            <div>
                <label for="txt-servicio">Tipo Servicio:</label>
                <select id="txt-servicio" required class="swal2-input" value="${proveedor.tipoServicio}">
                <option value="Transporte">Transporte</option>
                <option value="Hotel">Hotel</option>
                <option value="Corte de Pelo">Corte de Pelo	</option>
                <option value="Corte de Uñas">Corte de Uñas</option>
                <option value="Grooming">Grooming</option>
                </select>
                
            </div>
            <div>
                <label for="txt-persona">Persona Acargo:</label>
                <input type="text" id="txt-persona" required class="swal2-input" value="${proveedor.pAcargo}">
                
            </div>
            <div>
                <label for="txt-nombre">Empresa:</label>
                <input type="text" id="txt-empresa" required class="swal2-input" value="${proveedor.empresa}">
                
            </div>
            <div>
                <label for="txt-nombre">Teléfono:</label>
                <input type="text" id="txt-telefono" required class="swal2-input" value="${proveedor.telefono}">
            
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                proveedor._id,
                document.querySelector('#txt-servicio').value,
                document.querySelector('#txt-persona').value,
                document.querySelector('#txt-empresa').value,
                document.querySelector('#txt-telefono').value,
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
            modificar_proveedor(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);
        }
    }
}
const mostrar_proveedor = async() => {
    let lista_proveedor = await listar_proveedor();
    console.log(lista_proveedor);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_proveedor.forEach((proveedor) => {
        console.log(proveedor);
        if (proveedor.correo.toUpperCase().includes(filtro) || proveedor.activo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = proveedor.tipoServicio;
            fila.insertCell().innerHTML = proveedor.pAcargo;
            fila.insertCell().innerHTML = proveedor.empresa;
            fila.insertCell().innerHTML = proveedor.telefono;

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(proveedor);
            })
            celda_editar.appendChild(boton_editar);

        }

    });
};

mostrar_proveedor();

input_filtro.addEventListener('keyup', mostrar_proveedor);