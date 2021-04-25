'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_usuario = async() => {
    let lista_usuario = await listar_usuario();
    console.log(lista_usuario);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();
    const mostrar_modal_cambiar_estado = async(usuario) => {

        if (usuario) {
            const { value: accept } = await Swal.fire({
                icon: 'warning',
                text: '¿Está seguro que desea cambiar el estado del usuario?',
                confirmButtonText: `Si`,
                showCancelButton: true
            });
            if (accept) {
                cambiar_estado1(usuario._id, usuario.activo);
            }
        }
    }
    lista_usuario.forEach((usuario) => {
        console.log(usuario);
        if (usuario.correo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = usuario.nombre;
            fila.insertCell().innerHTML = usuario.apellido;
            fila.insertCell().innerHTML = usuario.tipoIdentificacion;
            fila.insertCell().innerHTML = usuario.identificacion;
            fila.insertCell().innerHTML = usuario.fechaNacimiento;
            fila.insertCell().innerHTML = usuario.provincia;
            fila.insertCell().innerHTML = usuario.canton;
            fila.insertCell().innerHTML = usuario.distrito;
            fila.insertCell().innerHTML = usuario.genero;
            fila.insertCell().innerHTML = usuario.cantidadMascotas;
            fila.insertCell().innerHTML = usuario.telefono;
            fila.insertCell().innerHTML = usuario.correo;
            fila.insertCell().innerHTML = usuario.activo;
            fila.insertCell().innerHTML = usuario.estado;

            let celda_cambiar_estado = fila.insertCell();
            let boton_cambiar_estado = document.createElement('button');
            boton_cambiar_estado.type = 'button';
            if (usuario.activo.toUpperCase() != "ACTIVO") {
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
                mostrar_modal_cambiar_estado(usuario)
            });
        }

    });
};

mostrar_usuario();

input_filtro.addEventListener('keyup', mostrar_usuario);