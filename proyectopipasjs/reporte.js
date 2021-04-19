'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica
const mostrar_usuario = async() => {
    let lista_usuario = await listar_usuario();
    tabla.innerHTML = '';

    lista_usuario.forEach((usuario) => {
        console.log(usuario);
        if (usuario.activo == "Activo") {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = usuario.nombre;
            fila.insertCell().innerHTML = usuario.apellido;
            fila.insertCell().innerHTML = usuario.tipoIdentificacion;
            fila.insertCell().innerHTML = usuario.fechaNacimiento;
            fila.insertCell().innerHTML = usuario.genero;
            fila.insertCell().innerHTML = usuario.cantidadMascotas;
            fila.insertCell().innerHTML = usuario.telefono;
            fila.insertCell().innerHTML = usuario.correo;
        }

    });
};

mostrar_usuario();