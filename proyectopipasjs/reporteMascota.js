'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");

const btn_imprimir = document.querySelector('#imprimir');
//Tabla dinamica
const mostrar_mascota = async() => {
    let lista_mascotas = await listar_mascotas();
    console.log(lista_mascotas);
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();

    lista_mascotas.forEach((mascota) => {
        console.log(mascota);
        if (mascota.tipoRaza.toUpperCase().includes(filtro)) {
            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = mascota.nombreMascota;
            fila.insertCell().innerHTML = mascota.tipoMascota;
            fila.insertCell().innerHTML = mascota.tipoRaza;
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

mostrar_mascota();
input_filtro.addEventListener('keyup', mostrar_mascota);