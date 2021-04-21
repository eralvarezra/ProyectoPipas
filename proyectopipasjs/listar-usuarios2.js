'use strict'

let cookies = document.cookie.split(";").map(cookie => cookie.split('=')).reduce((accumulator, [key, correo]) => ({...accumulator, [key.trim()]: decodeURIComponent(correo) }));
console.log(cookies.correo);

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
document.getElementById('txt-filtro').value = cookies.correo
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_modal_editar = async(usuario) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Usuario',
        html: `
            <div>
            <label for="txt-nombre">Nombre:</label>
            <input type="text" id="txt-nombre" required class="swal2-input" value="${usuario.nombre}"> 
            </div>
            <div>
                <label for="txt-apellido">Apellido:</label>
                <input type="text" id="txt-apellido" required class="swal2-input" value="${usuario.apellido}">
                
            </div>
            <div>
                <label for="txt-telefono">Teléfono:</label>
                <input type="text" id="txt-telefono" required class="swal2-input" value="${usuario.telefono}">
                
            </div>
            <div>
                <label for="txt-genero">Género:</label>
                <select id="txt-genero" required class="swal2-input" value="${usuario.genero}">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                </select>
            </div>
            <div>
            <label for="txt-identificacion">Identificacion:</label>
            <input type="text" id="txt-identificacion" required class="swal2-input" value="${usuario.identificacion}">
            </div>
            <div>
            <label for="txt-numeroTarjeta">Numero de tarjeta:</label>
            <input type="text" id="txt-numeroTarjeta" required class="swal2-input" value="${usuario.numeroTarjeta}">

            `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                usuario._id,
                document.querySelector('#txt-nombre').value,
                document.querySelector('#txt-apellido').value,
                document.querySelector('#txt-telefono').value,
                document.querySelector('#txt-genero').value,
                document.querySelector('#txt-identificacion').value,
                document.querySelector('#txt-numeroTarjeta').value
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
            modificar_usuario(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5], formValues[6]);
        }
    }
}
const mostrar_usuario = async() => {
    let lista_usuario = await listar_usuario();
    console.log(lista_usuario);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_usuario.forEach((usuario) => {
        console.log(usuario);
        if (usuario.correo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = usuario.nombre;
            fila.insertCell().innerHTML = usuario.apellido;
            fila.insertCell().innerHTML = usuario.telefono;
            fila.insertCell().innerHTML = usuario.genero;
            fila.insertCell().innerHTML = usuario.identificacion;
            fila.insertCell().innerHTML = usuario.numeroTarjeta;


            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(usuario);
            })
            celda_editar.appendChild(boton_editar);

        }

    });
};

mostrar_usuario();

input_filtro.addEventListener('keyup', mostrar_usuario);