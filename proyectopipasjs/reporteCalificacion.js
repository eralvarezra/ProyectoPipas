'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
const btn_descargar = document.querySelector('#descargar');
const btn_imprimir = document.querySelector('#imprimir');
//Tabla dinamica
const mostrar_comentario = async() => {
    let lista_comentario = await listar_calificacion();
    tabla.innerHTML = '';

    lista_comentario.forEach((comentario) => {
        console.log(comentario);

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = comentario.nombreProveedor;
        fila.insertCell().innerHTML = comentario.comentario;
        fila.insertCell().innerHTML = comentario.calificacion;


    });
};

function imprimir() {
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write();
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

mostrar_comentario();