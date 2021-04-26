'use strict'

//obteniendo los elementos de HTML
const tabla = document.querySelector("#tbl-resultados tbody");
//Filtro
const input_filtro = document.querySelector("#txt-filtro");
//Tabla dinamica

const btn_imprimir = document.querySelector('#imprimir');

const mostrar_proveedor = async() => {
    let lista_proveedor = await listar_proveedor();
    tabla.innerHTML = '';
    let filtro = input_filtro.value.toUpperCase();
    lista_proveedor.forEach((proveedor) => {
        console.log(proveedor);

        if (proveedor.tipoServicio.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = proveedor.empresa;
            fila.insertCell().innerHTML = proveedor.correo;
            fila.insertCell().innerHTML = proveedor.pAcargo;
            fila.insertCell().innerHTML = proveedor.telefono;
            fila.insertCell().innerHTML = proveedor.tipoServicio;
            fila.insertCell().innerHTML = proveedor.tipoIdentificacion;
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

mostrar_proveedor();

input_filtro.addEventListener('keyup', mostrar_proveedor);