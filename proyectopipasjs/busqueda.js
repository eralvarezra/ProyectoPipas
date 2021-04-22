const rate5 = document.getElementById("rate5");
const rate4 = document.getElementById("rate4");
const rate3 = document.getElementById("rate3");
const rate2 = document.getElementById("rate2");
const rate1 = document.getElementById("rate1");
const rdbtnall = document.getElementById("All");
const tipoMascota = document.getElementById("tipoMascota");
const tipoServicio = document.getElementById("tipoServicio");
const btnBuscar = document.getElementById("btnBuscar");
const tabla = document.querySelector("#tbl-resultados tbody");


const cargar_servicios = async() => {
    let lista_tipoServicio = await listar_tipoServicio();

    lista_tipoServicio.forEach((servicio) => {
        let temporal = servicio.nombreServicio;
        let newoption = document.createElement('option');
        newoption.innerHTML = temporal;
        newoption.value = temporal;
        tipoServicio.appendChild(newoption);
    });
}
const cargar_tipoMascota = async() => {
    let lista_tipo = await listar_tipo();
    console.log(lista_tipo)

    lista_tipo.forEach((tipo) => {
        let temporal = tipo.nombreTipo;
        let newoption = document.createElement('option');
        newoption.innerHTML = temporal;
        newoption.value = temporal;
        tipoMascota.appendChild(newoption);
    });
}

const filtrar = () => {
    let filtroRate;
    let filtroTipoMascota;
    let filtroTipoServicio;
    let i = 1;

    for (i; i < 6; i++) {
        if (rate1.checked === true) {
            filtroRate = 1;
        } else if (rate2.checked === true) {
            filtroRate = 2;
        } else if (rate3.checked === true) {
            filtroRate = 3;
        } else if (rate4.checked === true) {
            filtroRate = 4;
        } else if (rate5.checked === true) {
            filtroRate = 5;
        } else {
            filtroRate = "";
        }
    }

    filtroTipoMascota = tipoMascota.value;
    filtroTipoServicio = tipoServicio.value;
    mostrar_servicio(filtroRate, filtroTipoMascota, filtroTipoServicio)
}

const mostrar_servicio = async(pfiltroRate, pfiltroTipoMascota, pfiltroTipoServicio) => {
    let lista_servicio = await listar_servicio();
    let lista_proveedor = await listar_proveedor();
    let lista_calificacion = await listar_calificacion();
    console.log(lista_servicio);
    tabla.innerHTML = '';
    let filtroRate = pfiltroRate;
    let filtroTipoMascota = pfiltroTipoMascota;
    let filtroTipoServicio = pfiltroTipoServicio;
    var fila;

    lista_servicio.forEach((servicio) => {
        console.log(servicio);
        if (servicio.nombreServicio.includes(filtroTipoServicio) && servicio.tipoMascota.includes(filtroTipoMascota)) {
            fila = tabla.insertRow();
            fila.insertCell().innerHTML = servicio.nombreServicio;
            fila.insertCell().innerHTML = servicio.tipoMascota;
            fila.insertCell().innerHTML = servicio.detalleServicio;
            filtro = servicio.correo;
            lista_proveedor.forEach((proveedor) => {
                console.log(proveedor);
                if (proveedor.correo.includes(filtro)) {
                    fila.insertCell().innerHTML = proveedor.empresa;
                }
            });
            let puntaje = 0;
            let cantidad = 0;
            let promedio = 0;
            lista_calificacion.forEach((calificacion) => {
                if (filtro === calificacion.nombreProveedor) {
                    cantidad = cantidad + 1;
                    puntaje = puntaje + calificacion.calificacion;
                    promedio = puntaje / cantidad;
                    promedio = Math.round(promedio);
                }
                console.log(promedio)
            });
            if (promedio > 0) {
                let celda_editar;
                let celda_editar2;
                let pata1 = document.createElement('button');
                let pata2 = document.createElement('button');
                let pata3 = document.createElement('button');
                let pata4 = document.createElement('button');
                let pata5 = document.createElement('button');
                let boton_editar = document.createElement('button');
                celda_editar = fila.insertCell();
                celda_editar2 = fila.insertCell();
                switch (promedio) {
                    case 1:
                        pata1.classList.add("fas");
                        pata1.classList.add("fa-paw");
                        pata1.style.backgroundColor = "white";
                        pata1.style.borderColor = "white";
                        pata1.style.boxShadow = "none";
                        pata1.style.color = "#0CC49F";

                        pata2.classList.add("fas")
                        pata2.classList.add("fa-paw")
                        pata2.style.backgroundColor = "white";
                        pata2.style.borderColor = "white";
                        pata2.style.boxShadow = "none";
                        pata2.style.color = "black";

                        pata3.classList.add("fas");
                        pata3.classList.add("fa-paw");
                        pata3.style.backgroundColor = "white";
                        pata3.style.borderColor = "white";
                        pata3.style.boxShadow = "none";
                        pata3.style.color = "black";

                        pata4.classList.add("fas")
                        pata4.classList.add("fa-paw")
                        pata4.style.backgroundColor = "white";
                        pata4.style.borderColor = "white";
                        pata4.style.boxShadow = "none";
                        pata4.style.color = "black";

                        pata5.classList.add("fas")
                        pata5.classList.add("fa-paw")
                        pata5.style.backgroundColor = "white";
                        pata5.style.borderColor = "white";
                        pata5.style.boxShadow = "none";
                        pata5.style.color = "black";
                        celda_editar.appendChild(pata1);
                        celda_editar.appendChild(pata2);
                        celda_editar.appendChild(pata3);
                        celda_editar.appendChild(pata4);
                        celda_editar.appendChild(pata5);

                        break;
                    case 2:
                        pata1.classList.add("fas");
                        pata1.classList.add("fa-paw");
                        pata1.style.backgroundColor = "white";
                        pata1.style.borderColor = "white";
                        pata1.style.boxShadow = "none";
                        pata1.style.color = "#0CC49F";
                        pata2.classList.add("fas");
                        pata2.classList.add("fa-paw");
                        pata2.style.backgroundColor = "white";
                        pata2.style.borderColor = "white";
                        pata2.style.boxShadow = "none";
                        pata2.style.color = "#0CC49F";
                        pata3.classList.add("fas")
                        pata3.classList.add("fa-paw")
                        pata3.style.backgroundColor = "white";
                        pata3.style.borderColor = "white";
                        pata3.style.boxShadow = "none";
                        pata3.style.color = "black";
                        pata4.classList.add("fas")
                        pata4.classList.add("fa-paw")
                        pata4.style.backgroundColor = "white";
                        pata4.style.borderColor = "white";
                        pata4.style.boxShadow = "none";
                        pata4.style.color = "black";
                        pata5.classList.add("fas")
                        pata5.classList.add("fa-paw")
                        pata5.style.backgroundColor = "white";
                        pata5.style.borderColor = "white";
                        pata5.style.boxShadow = "none";
                        pata5.style.color = "black";
                        celda_editar.appendChild(pata1);
                        celda_editar.appendChild(pata2);
                        celda_editar.appendChild(pata3);
                        celda_editar.appendChild(pata4);
                        celda_editar.appendChild(pata5);


                        break;
                    case 3:

                        pata1.classList.add("fas");
                        pata1.classList.add("fa-paw");
                        pata1.style.backgroundColor = "white";
                        pata1.style.borderColor = "white";
                        pata1.style.boxShadow = "none";
                        pata1.style.color = "#0CC49F";

                        pata2.classList.add("fas");
                        pata2.classList.add("fa-paw");
                        pata2.style.backgroundColor = "white";
                        pata2.style.borderColor = "white";
                        pata2.style.boxShadow = "none";
                        pata2.style.color = "#0CC49F";

                        pata3.classList.add("fas");
                        pata3.classList.add("fa-paw");
                        pata3.style.backgroundColor = "white";
                        pata3.style.borderColor = "white";
                        pata3.style.boxShadow = "none";
                        pata3.style.color = "#0CC49F";

                        pata4.classList.add("fas")
                        pata4.classList.add("fa-paw")
                        pata4.style.backgroundColor = "white";
                        pata4.style.borderColor = "white";
                        pata4.style.boxShadow = "none";
                        pata4.style.color = "black";

                        pata5.classList.add("fas")
                        pata5.classList.add("fa-paw")
                        pata5.style.backgroundColor = "white";
                        pata5.style.borderColor = "white";
                        pata5.style.boxShadow = "none";
                        pata5.style.color = "black";

                        celda_editar.appendChild(pata1);
                        celda_editar.appendChild(pata2);
                        celda_editar.appendChild(pata3);
                        celda_editar.appendChild(pata4);
                        celda_editar.appendChild(pata5);

                        break;
                    case 4:
                        pata1.classList.add("fas")
                        pata1.classList.add("fa-paw")
                        pata1.style.backgroundColor = "white";
                        pata1.style.borderColor = "white";
                        pata1.style.boxShadow = "none";
                        pata1.style.color = "#0CC49F";

                        pata2.classList.add("fas")
                        pata2.classList.add("fa-paw")
                        pata2.style.backgroundColor = "white";
                        pata2.style.borderColor = "white";
                        pata2.style.boxShadow = "none";
                        pata2.style.color = "#0CC49F";

                        pata3.classList.add("fas")
                        pata3.classList.add("fa-paw")
                        pata3.style.backgroundColor = "white";
                        pata3.style.borderColor = "white";
                        pata3.style.boxShadow = "none";
                        pata3.style.color = "#0CC49F";

                        pata4.classList.add("fas")
                        pata4.classList.add("fa-paw")
                        pata4.style.backgroundColor = "white";
                        pata4.style.borderColor = "white";
                        pata4.style.boxShadow = "none";
                        pata4.style.color = "#0CC49F";

                        pata5.classList.add("fas")
                        pata5.classList.add("fa-paw")
                        pata5.style.backgroundColor = "white";
                        pata5.style.borderColor = "white";
                        pata5.style.boxShadow = "none";
                        pata5.style.color = "black";

                        celda_editar.appendChild(pata1);
                        celda_editar.appendChild(pata2);
                        celda_editar.appendChild(pata3);
                        celda_editar.appendChild(pata4);
                        celda_editar.appendChild(pata5);

                        break;
                    case 5:
                        pata1.classList.add("fas");
                        pata1.classList.add("fa-paw");
                        pata1.style.backgroundColor = "white";
                        pata1.style.borderColor = "white";
                        pata1.style.boxShadow = "none";
                        pata1.style.color = "#0CC49F";


                        pata2.classList.add("fas")
                        pata2.classList.add("fa-paw")
                        pata2.style.backgroundColor = "white";
                        pata2.style.borderColor = "white";
                        pata2.style.boxShadow = "none";
                        pata2.style.color = "#0CC49F";


                        pata3.classList.add("fas")
                        pata3.classList.add("fa-paw")
                        pata3.style.backgroundColor = "white";
                        pata3.style.borderColor = "white";
                        pata3.style.boxShadow = "none";
                        pata3.style.color = "#0CC49F";


                        pata4.classList.add("fas")
                        pata4.classList.add("fa-paw")
                        pata4.style.backgroundColor = "white";
                        pata4.style.borderColor = "white";
                        pata4.style.boxShadow = "none";
                        pata4.style.color = "#0CC49F";


                        pata5.classList.add("fas")
                        pata5.classList.add("fa-paw")
                        pata5.style.backgroundColor = "white";
                        pata5.style.borderColor = "white";
                        pata5.style.boxShadow = "none";
                        pata5.style.color = "#0CC49F";


                        celda_editar.appendChild(pata1);
                        celda_editar.appendChild(pata2);
                        celda_editar.appendChild(pata3);
                        celda_editar.appendChild(pata4);
                        celda_editar.appendChild(pata5);


                        break;
                    default:
                        promedio;
                        break;
                }

                boton_editar.classList.add("fas");
                boton_editar.classList.add("fa-dog");
                boton_editar.style.backgroundColor = "#e69138"
                boton_editar.type = 'button';
                celda_editar2.appendChild(boton_editar);



                //for (let i in table.rows) {
                //  let row = table.rows[i]
                //iterate through rows
                //rows would be accessed using the "row" variable assigned in the for loop

                //}
            }
        }
    });


};


window.onload = mostrar_servicio("", "", "");
cargar_servicios();
cargar_tipoMascota();
btnBuscar.addEventListener("click", filtrar);