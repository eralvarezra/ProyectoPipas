'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

function readCookie(pCookie) {
    const nameString = pCookie + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    } else {
        return ""
    }
}

const cookieCorreo = () => {
    let correoCookie = readCookie("correo");
    correoCookie = correoCookie.replace("=", "");
    let cookie = correoCookie;
    return cookie;
}

const mostrar_modal_editar = async(servicio) => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Servicio',
            html: `
            <div>
                <label for="txt-nombre">Nombre:</label>
                <input type="text" id="txt-nombre" required class="swal2-input" value="${servicio.nombreServicio}">
                <label for="txt-correo">Correo:</label>
                <input type="text" id="txt-correo" required class="swal2-input" value="${servicio.correo}">
                <label for="num-precio">Precio:</label>
                <input type="text" id="num-precio" required class="swal2-input" value="${servicio.precio}">
                <label for="txt-detalleServicio">Detalle Servicio:</label>
                <input type="text" id="txt-detalleServicio" required class="swal2-input" value="${servicio.detalleServicio}">
                <label for="num-costoServicioXhora">Costo por Hora:</label>
                <input type="text" id="num-costoServicioXhora" required class="swal2-input" value="${servicio.costoServicioXhora}">
            </div>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    servicio._id,
                    document.querySelector('#txt-nombre').value,
                    document.querySelector('#txt-correo').value,
                    document.querySelector('#num-precio').value,
                    document.querySelector('#txt-detalleServicio').value,
                    document.querySelector('#num-costoServicioXhora').value,
                ]
            }
        });
        if (formValues) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: 'Está seguro que desea modificar el Servicio',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                modificar_servicio(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5]);
            }
        }
    }
    //Tabla dinamica
const mostrar_servicio = async() => {
    let lista_servicio = await listar_servicio();
    console.log(lista_servicio);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();
    filtro = cookieCorreo('correo');
    console.log(filtro);
    input_filtro.style.display = 'none';
    document.querySelector('#lbl-filtro').style.display = 'none';

    lista_servicio.forEach((servicio) => {
        console.log(servicio);
        if (servicio.correo.includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = servicio.correo;
            fila.insertCell().innerHTML = servicio.detalleServicio;


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
                eliminar_servicio(servicio._id)
            });
        }

    });

};

mostrar_servicio();

input_filtro.addEventListener('keyup', mostrar_servicio);