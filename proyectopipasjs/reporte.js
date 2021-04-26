'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const btn_imprimir = document.querySelector('#imprimir');
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
            fila.insertCell().innerHTML = usuario.genero;
            fila.insertCell().innerHTML = usuario.cantidadMascotas;
            fila.insertCell().innerHTML = usuario.telefono;


            fila.insertCell().innerHTML = usuario.correo;
        }

    });
};

function imprimir() {
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    for (var i = 0, row; row = tabla.rows[i]; i++) {
        //alert(cell[i].innerText);
        for (var j = 0, col; col = row.cells[j]; j++) {
            //alert(col[j].innerText);
            ventana.document.write(row.cells[j].innerText);
            ventana.document.write('<br></br>');
            console.log(row.cells[j].innerText)

        }
    }
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
}

btn_imprimir.addEventListener('click', () => {
    imprimir();
});

mostrar_usuario();