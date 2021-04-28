'use strict'
const tabla = document.querySelector('#tbl-resultados tbody');

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
const mostrar_facturaServicio = async() => {
    let lista_factura = await listar_factura();
    console.log(listar_factura);
    tabla.innerHTML = '';

    var filtro = readCookie('correo');
    filtro = filtro.replace("=", "");

    lista_factura.forEach((factura) => {
        console.log(factura);
        if (factura.correoUsuario == (filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = factura._id;
            fila.insertCell().innerHTML = factura.nombreEmpresa;
            fila.insertCell().innerHTML = factura.tipoServicio;


            let celda_ver = fila.insertCell();
            let boton_ver = document.createElement('button');
            boton_ver.classList.add("far")
            boton_ver.classList.add("fa-eye")
            boton_ver.type = 'button';

            boton_ver.addEventListener('click', async() => {
                document.cookie = "id_servicio" + factura._id;
                location.href = "../proyectopipashtml/facturarServicio.html";
            })
            celda_ver.appendChild(boton_ver);

        }

    });

}

mostrar_facturaServicio();