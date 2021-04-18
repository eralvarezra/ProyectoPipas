'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_proveedor = async() => {
    let lista_proveedor = await listar_proveedor();
    console.log(lista_proveedor);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();
    const mostrar_modal_cambiar_estado = async(proveedor) => {

        if (proveedor) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: 'Está seguro que desea cambiar el estado del proveedor?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                cambiar_estado(proveedor._id, proveedor.activo);
            }
        }
    }
    lista_proveedor.forEach((proveedor) => {
        console.log(proveedor);
        if (proveedor.correo.toUpperCase().includes(filtro) || proveedor.activo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = proveedor.tipoProveedor;
            fila.insertCell().innerHTML = proveedor.tipoServicio;
            fila.insertCell().innerHTML = proveedor.pAcargo;
            fila.insertCell().innerHTML = proveedor.empresa;
            fila.insertCell().innerHTML = proveedor.telefono;
            fila.insertCell().innerHTML = proveedor.correo;
            fila.insertCell().innerHTML = proveedor.activo;
            fila.insertCell().innerHTML = proveedor.estado;

            let celda_cambiar_estado = fila.insertCell();
            let boton_cambiar_estado = document.createElement('button');
            boton_cambiar_estado.type = 'button';
            if (proveedor.activo.toUpperCase() != "ACTIVO") {
                boton_cambiar_estado.innerHTML = 'Activar';
                boton_cambiar_estado.classList.add("far")
                boton_cambiar_estado.classList.add("fa-check-circle")
            } else {
                boton_cambiar_estado.innerHTML = 'Desactivar';
                boton_cambiar_estado.classList.add("far")
                boton_cambiar_estado.classList.add("fa-times-circle")
            }

            celda_cambiar_estado.appendChild(boton_cambiar_estado);

            boton_cambiar_estado.addEventListener('click', async() => {
                mostrar_modal_cambiar_estado(proveedor)
            });
        }

    });
};

mostrar_proveedor();

input_filtro.addEventListener('keyup', mostrar_proveedor);