const rate5 = document.getElementById("rate5");
const rate4 = document.getElementById("rate4");
const rate3 = document.getElementById("rate3");
const rate2 = document.getElementById("rate2");
const rate1 = document.getElementById("rate1");
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
    let valor;
    let filtroRate;
    let filtroTipoMascota;
    let filtroTipoServicio;

    for (let i = 0; i < 5; i++) {
        switch (i) {
            case 1:
                if (rate1.selected) {
                    valor = i + 1;
                    i = 5;
                }
                break;
            case 2:
                if (rate2.selected) {
                    valor = i + 1;
                    i = 5;
                }
                break;
            case 3:
                if (rate3.selected) {
                    valor = i + 1;
                    i = 5;
                }
                break;
            case 4:
                if (rate4.selected) {
                    valor = i + 1;
                    i = 5;
                }
                break;
            case 5:
                if (rate5.selected) {
                    valor = i + 1;
                    i = 5;
                }
                break;
            default:
                valor = "";
                break;
        }
    }
    filtroRate = valor;
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
        if (servicio.nombreServicio.includes(filtroTipoServicio)) {
            fila = tabla.insertRow();
            fila.insertCell().innerHTML = servicio.nombreServicio;
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
                let boton_editar = document.createElement('button');
                let boton_editar2 = document.createElement('button');
                let boton_editar3 = document.createElement('button');
                let boton_editar4 = document.createElement('button');
                let boton_editar5 = document.createElement('button');
                celda_editar = fila.insertCell();
                switch (promedio) {
                    case 1:
                        boton_editar.classList.add("fas");
                        boton_editar.classList.add("fa-paw");
                        boton_editar.style.backgroundColor = "white";
                        boton_editar.style.borderColor = "white";
                        boton_editar.style.boxShadow = "none";
                        boton_editar.style.color = "#0CC49F";
                        boton_editar2.classList.add("fas")
                        boton_editar2.classList.add("fa-paw")
                        boton_editar2.style.backgroundColor = "white";
                        boton_editar2.style.borderColor = "white";
                        boton_editar2.style.boxShadow = "none";
                        boton_editar2.style.color = "black";
                        boton_editar3.classList.add("fas")
                        boton_editar3.classList.add("fa-paw")
                        boton_editar3.style.backgroundColor = "white";
                        boton_editar3.style.borderColor = "white";
                        boton_editar3.style.boxShadow = "none";
                        boton_editar3.style.color = "black";
                        boton_editar4.classList.add("fas")
                        boton_editar4.classList.add("fa-paw")
                        boton_editar4.style.backgroundColor = "white";
                        boton_editar4.style.borderColor = "white";
                        boton_editar4.style.boxShadow = "none";
                        boton_editar4.style.color = "black";
                        boton_editar5.classList.add("fas")
                        boton_editar5.classList.add("fa-paw")
                        boton_editar5.style.backgroundColor = "white";
                        boton_editar5.style.borderColor = "white";
                        boton_editar5.style.boxShadow = "none";
                        boton_editar5.style.color = "black";
                        celda_editar.appendChild(boton_editar);
                        celda_editar.appendChild(boton_editar2);
                        celda_editar.appendChild(boton_editar3);
                        celda_editar.appendChild(boton_editar4);
                        celda_editar.appendChild(boton_editar5);
                        break;
                    case 2:
                        boton_editar.classList.add("fas");
                        boton_editar.classList.add("fa-paw");
                        boton_editar.style.backgroundColor = "white";
                        boton_editar.style.borderColor = "white";
                        boton_editar.style.boxShadow = "none";
                        boton_editar.style.color = "#0CC49F";
                        boton_editar2.classList.add("fas")
                        boton_editar2.classList.add("fa-paw")
                        boton_editar2.style.backgroundColor = "white";
                        boton_editar2.style.borderColor = "white";
                        boton_editar2.style.boxShadow = "none";
                        boton_editar2.style.color = "#0CC49F";
                        boton_editar3.classList.add("fas")
                        boton_editar3.classList.add("fa-paw")
                        boton_editar3.style.backgroundColor = "white";
                        boton_editar3.style.borderColor = "white";
                        boton_editar3.style.boxShadow = "none";
                        boton_editar3.style.color = "black";
                        boton_editar4.classList.add("fas")
                        boton_editar4.classList.add("fa-paw")
                        boton_editar4.style.backgroundColor = "white";
                        boton_editar4.style.borderColor = "white";
                        boton_editar4.style.boxShadow = "none";
                        boton_editar4.style.color = "black";
                        boton_editar5.classList.add("fas")
                        boton_editar5.classList.add("fa-paw")
                        boton_editar5.style.backgroundColor = "white";
                        boton_editar5.style.borderColor = "white";
                        boton_editar5.style.boxShadow = "none";
                        boton_editar5.style.color = "black";
                        celda_editar.appendChild(boton_editar);
                        celda_editar.appendChild(boton_editar2);
                        celda_editar.appendChild(boton_editar3);
                        celda_editar.appendChild(boton_editar4);
                        celda_editar.appendChild(boton_editar5);
                        break;
                    case 3:

                        boton_editar.classList.add("fas");
                        boton_editar.classList.add("fa-paw");
                        boton_editar.style.backgroundColor = "white";
                        boton_editar.style.borderColor = "white";
                        boton_editar.style.boxShadow = "none";
                        boton_editar.style.color = "#0CC49F";
                        boton_editar2.classList.add("fas")
                        boton_editar2.classList.add("fa-paw")
                        boton_editar2.style.backgroundColor = "white";
                        boton_editar2.style.borderColor = "white";
                        boton_editar2.style.boxShadow = "none";
                        boton_editar2.style.color = "#0CC49F";
                        boton_editar3.classList.add("fas")
                        boton_editar3.classList.add("fa-paw")
                        boton_editar3.style.backgroundColor = "white";
                        boton_editar3.style.borderColor = "white";
                        boton_editar3.style.boxShadow = "none";
                        boton_editar3.style.color = "#0CC49F";
                        boton_editar4.classList.add("fas")
                        boton_editar4.classList.add("fa-paw")
                        boton_editar4.style.backgroundColor = "white";
                        boton_editar4.style.borderColor = "white";
                        boton_editar4.style.boxShadow = "none";
                        boton_editar4.style.color = "black";
                        boton_editar5.classList.add("fas")
                        boton_editar5.classList.add("fa-paw")
                        boton_editar5.style.backgroundColor = "white";
                        boton_editar5.style.borderColor = "white";
                        boton_editar5.style.boxShadow = "none";
                        boton_editar5.style.color = "black";
                        celda_editar.appendChild(boton_editar);
                        celda_editar.appendChild(boton_editar2);
                        celda_editar.appendChild(boton_editar3);
                        celda_editar.appendChild(boton_editar4);
                        celda_editar.appendChild(boton_editar5);
                        break;
                    case 4:
                        boton_editar.classList.add("fas")
                        boton_editar.classList.add("fa-paw")
                        boton_editar.style.backgroundColor = "white";
                        boton_editar.style.borderColor = "white";
                        boton_editar.style.boxShadow = "none";
                        boton_editar.style.color = "#0CC49F";
                        boton_editar2.classList.add("fas")
                        boton_editar2.classList.add("fa-paw")
                        boton_editar2.style.backgroundColor = "white";
                        boton_editar2.style.borderColor = "white";
                        boton_editar2.style.boxShadow = "none";
                        boton_editar2.style.color = "#0CC49F";
                        boton_editar3.classList.add("fas")
                        boton_editar3.classList.add("fa-paw")
                        boton_editar3.style.backgroundColor = "white";
                        boton_editar3.style.borderColor = "white";
                        boton_editar3.style.boxShadow = "none";
                        boton_editar3.style.color = "#0CC49F";
                        boton_editar4.classList.add("fas")
                        boton_editar4.classList.add("fa-paw")
                        boton_editar4.style.backgroundColor = "white";
                        boton_editar4.style.borderColor = "white";
                        boton_editar4.style.boxShadow = "none";
                        boton_editar4.style.color = "#0CC49F";
                        boton_editar5.classList.add("fas")
                        boton_editar5.classList.add("fa-paw")
                        boton_editar5.style.backgroundColor = "white";
                        boton_editar5.style.borderColor = "white";
                        boton_editar5.style.boxShadow = "none";
                        boton_editar5.style.color = "black";

                        celda_editar.appendChild(boton_editar);
                        celda_editar.appendChild(boton_editar2);
                        celda_editar.appendChild(boton_editar3);
                        celda_editar.appendChild(boton_editar4);
                        celda_editar.appendChild(boton_editar5);
                        break;
                    case 5:
                        boton_editar.classList.add("fas");
                        boton_editar.classList.add("fa-paw");
                        boton_editar.style.backgroundColor = "white";
                        boton_editar.style.borderColor = "white";
                        boton_editar.style.boxShadow = "none";
                        boton_editar.style.color = "#0CC49F";

                        boton_editar2.classList.add("fas")
                        boton_editar2.classList.add("fa-paw")
                        boton_editar2.style.backgroundColor = "white";
                        boton_editar2.style.borderColor = "white";
                        boton_editar2.style.boxShadow = "none";
                        boton_editar2.style.color = "#0CC49F";

                        boton_editar3.classList.add("fas")
                        boton_editar3.classList.add("fa-paw")
                        boton_editar3.style.backgroundColor = "white";
                        boton_editar3.style.borderColor = "white";
                        boton_editar3.style.boxShadow = "none";
                        boton_editar3.style.color = "#0CC49F";

                        boton_editar4.classList.add("fas")
                        boton_editar4.classList.add("fa-paw")
                        boton_editar4.style.backgroundColor = "white";
                        boton_editar4.style.borderColor = "white";
                        boton_editar4.style.boxShadow = "none";
                        boton_editar4.style.color = "#0CC49F";

                        boton_editar5.classList.add("fas")
                        boton_editar5.classList.add("fa-paw")
                        boton_editar5.style.backgroundColor = "white";
                        boton_editar5.style.borderColor = "white";
                        boton_editar5.style.boxShadow = "none";
                        boton_editar5.style.color = "#0CC49F";

                        celda_editar.appendChild(boton_editar);
                        celda_editar.appendChild(boton_editar2);
                        celda_editar.appendChild(boton_editar3);
                        celda_editar.appendChild(boton_editar4);
                        celda_editar.appendChild(boton_editar5);
                        break;
                    default:
                        promedio;
                        break;
                }
                filtro = '';
            }
        }
    });

};


window.onload = mostrar_servicio("", "", "");
cargar_servicios();
cargar_tipoMascota();
btnBuscar.addEventListener("click", filtrar);