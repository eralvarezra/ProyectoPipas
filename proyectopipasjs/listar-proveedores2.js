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

    lista_proveedor.forEach((proveedor) => {
        console.log(proveedor);
        if (proveedor.correo.toUpperCase().includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = proveedor.tipoProveedor;
            fila.insertCell().innerHTML = proveedor.tipoServicio;
            fila.insertCell().innerHTML = proveedor.tipoIdentificacion;
            fila.insertCell().innerHTML = proveedor.pAcargo;
            fila.insertCell().innerHTML = proveedor.empresa;
            fila.insertCell().innerHTML = proveedor.telefono;
            fila.insertCell().innerHTML = proveedor.correo;
            fila.insertCell().innerHTML = proveedor.comentarios;
            fila.insertCell().innerHTML = proveedor.activo;
            fila.insertCell().innerHTML = proveedor.estado;

            if (proveedor.estado.toUpperCase() != "PENDIENTE") {
                let celda_vacia = fila.insertCell();
            } else {
                let celda_cambiar_estado = fila.insertCell();
                let boton_activar = document.createElement('button');
                boton_activar.innerHTML = 'Aceptar';
                boton_activar.type = 'button';
                boton_activar.classList.add("far")
                boton_activar.classList.add("fa-check-circle")
                celda_cambiar_estado.appendChild(boton_activar);
                let boton_rechazar = document.createElement('button');
                boton_rechazar.innerHTML = 'Rechazar';
                boton_rechazar.type = 'button';
                boton_rechazar.classList.add("far")
                boton_rechazar.classList.add("fa-times-circle")
                celda_cambiar_estado.appendChild(boton_rechazar);

                boton_activar.addEventListener('click', async() => {
                    aprobar_estado(proveedor._id, true)
                });

                boton_rechazar.addEventListener('click', async() => {
                    aprobar_estado(proveedor._id, false)
                });
            }
        }

    });
};

mostrar_proveedor();

input_filtro.addEventListener('keyup', mostrar_proveedor);