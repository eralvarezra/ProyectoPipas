'use strict';

const nombreMascotaU = document.querySelector('#nombreMascota');
const tipoMascotaU = document.querySelector('#tipoCaracteristica');
const razaMascota = document.querySelector('#tipoRaza');
const caracteristicaEspecialMascota = document.querySelector('#caracteristicaEspecial');
const caracteristicaPadecimientoMascota = document.querySelector('#tipoPadecimiento');
const caracteristicaVacunaMascota = document.querySelector('#tipoVacuna');
const slctMascota = document.querySelector('#mismascotas');
const tabla = document.getElementById('tabladinamica');
const tabla2 = document.getElementById('tabladinamica2');
const tabla3 = document.getElementById('tabladinamica3');
const tabla4 = document.getElementById('tabladinamica4');
const btnAgregar = document.getElementById("btn-agregar");
const btnModificar = document.getElementById("btn-modificar");
const btnVolver = document.getElementById("btn-volver");
const btnAgregarDetalles = document.getElementById('btn-agregarDetalles');
const btnSearch = document.getElementById("btn-search")

const sectionDetalles = document.getElementById("sct-detalleMascotas");
sectionDetalles.style.display = "none";
const tablaMascotas = document.getElementById("sct-mascotas");
tablaMascotas.style.display = "none";


const mostrar_modal_editarmascota = async(mascota) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar mascota',
        html: `
            <div>
                <label for="txt-servicio">Nombre Mascota:</label>
                <input type="text" id="txt-servicio" required class="swal2-input" value="${mascota.nombreMascota}">               
            </div>
            `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                mascota._id,
                document.querySelector('#txt-servicio').value,
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
            modificar_mascota(formValues[0], formValues[1]);
        }
    }
}



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

const mis_mascotas = async() => {
    let lista_mascota = await listar_mascotas();
    let correo = readCookie("correo");
    correo = correo.replace("=", "");

    lista_mascota.forEach((mascota) => {
        if (mascota.correo === correo) {
            let option = document.createElement('option');
            option.innerHTML = mascota.nombreMascota;
            option.text = mascota.nombreMascota;
            slctMascota.appendChild(option);
        }
    });
}


const mostrar_mascotas = async() => {
    let lista_mascota = await listar_mascotas();
    tabla.innerHTML = '';
    let filtro = slctMascota.value;
    console.log(filtro)
    let correo = readCookie("correo");
    correo = correo.replace("=", "");

    lista_mascota.forEach((mascota) => {
        console.log(mascota);
        if (mascota.correo === correo && mascota.nombreMascota === filtro) {
            tablaMascotas.style.display = "block";
            let fila = tabla.insertRow();
            if (mascota.fotoMascota == '' ||
                mascota.fotoMascota == undefined) {
                fila.insertCell().innerHTML = "Sin foto";
            } else {
                fila.insertCell().innerHTML =
                    "<img src=\"" + mascota.fotoMascota + "\" id=\"img-foto" + "\" class = \"imagen-tabla\">";
            }
            // fila.insertCell().innerHTML = (mascota.fotoMascota);
            fila.insertCell().innerHTML = (mascota.nombreMascota);
            fila.insertCell().innerHTML = (mascota.tipoMascota);
            fila.insertCell().innerHTML = (mascota.tipoRaza);
            //editar
            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("far")
            boton_editar.classList.add("fa-edit")
            boton_editar.classList.add("btn2")
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editarmascota(mascota);
            })
            celda_editar.appendChild(boton_editar);

            //Eliminar
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")
            boton_eliminar.classList.add("btn-eliminar")

            celda_eliminar.appendChild(boton_eliminar);
            celda_eliminar.addEventListener('click', async() => {
                if (mascota) {
                    const { value: accept } = await Swal.fire({
                        icon: 'warning',
                        text: '¿Está seguro que desea eliminar la mascota?',
                        confirmButtonText: `Si`,
                        showCancelButton: true
                    });
                    if (accept) {
                        eliminar_mascota(mascota._id);
                    }
                }
            });

            llenar_caracteristicas(filtro, correo);
        }
    });
}

const llenar_caracteristicas = async(pFiltro, pCorreo) => {
    let lista_mascotavacuna = await lista_Mascotavacuna();
    let lista_mascotapad = await lista_mascotapadecimiento();
    let lista_mascotacaracteristica = await listar_mascotaCaracteristica();
    tabla2.innerHTML = '';
    tabla3.innerHTML = '';
    tabla4.innerHTML = '';
    sectionDetalles.style.display = "block";

    for (var i = tabla2.rows.length - 1; i > 0; i--) {
        tabla2.deleteRow(i);
    }
    for (var i = tabla3.rows.length - 1; i > 0; i--) {
        tabla3.deleteRow(i);
    }
    for (var i = tabla4.rows.length - 1; i > 0; i--) {
        tabla4.deleteRow(i);
    }

    lista_mascotacaracteristica.forEach((caracteristica) => {
        let fila = tabla2.insertRow();
        if (caracteristica.correo === pCorreo && caracteristica.nombreMascota === pFiltro) {
            fila.insertCell().innerHTML = (caracteristica.caracteristicaEspecial);
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")
            boton_eliminar.classList.add("btn-eliminar")

            celda_eliminar.appendChild(boton_eliminar);
            celda_eliminar.addEventListener('click', async() => {
                if (caracteristica) {
                    const { value: accept } = await Swal.fire({
                        icon: 'warning',
                        text: 'Está seguro que desea eliminar la característica de la mascota',
                        confirmButtonText: `Si`,
                        showCancelButton: true
                    });
                    if (accept) {
                        eliminar_mascotaCaracteristica(caracteristica._id);
                    }
                }
            });
        }


    });

    lista_mascotapad.forEach((padecimiento) => {

        let fila = tabla3.insertRow();
        if (padecimiento.correo === pCorreo && padecimiento.nombreMascota === pFiltro) {
            fila.insertCell().innerHTML = (padecimiento.nombrePadecimiento);
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")
            boton_eliminar.classList.add("btn-eliminar")

            celda_eliminar.appendChild(boton_eliminar);
            celda_eliminar.addEventListener('click', async() => {
                if (padecimiento) {
                    const { value: accept } = await Swal.fire({
                        icon: 'warning',
                        text: 'Está seguro que desea eliminar el padecimiento',
                        confirmButtonText: `Si`,
                        showCancelButton: true
                    });
                    if (accept) {
                        eliminar_mascotapadecimiento(padecimiento._id);
                    }
                }
            });
        }


    });

    lista_mascotavacuna.forEach((mascotavacuna) => {
        let fila = tabla4.insertRow();
        if (mascotavacuna.correo === pCorreo && mascotavacuna.nombreMascota === pFiltro) {
            fila.insertCell().innerHTML = (mascotavacuna.nombreVacuna);
            let celda_eliminar = fila.insertCell();
            let boton_eliminar = document.createElement('button');
            boton_eliminar.type = 'button';

            boton_eliminar.classList.add("far")
            boton_eliminar.classList.add("fa-trash-alt")
            boton_eliminar.classList.add("btn-eliminar")

            celda_eliminar.appendChild(boton_eliminar);
            celda_eliminar.addEventListener('click', async() => {
                if (mascotavacuna) {
                    const { value: accept } = await Swal.fire({
                        icon: 'warning',
                        text: 'Está seguro que desea eliminar la vacuna',
                        confirmButtonText: `Si`,
                        showCancelButton: true
                    });
                    if (accept) {
                        eliminar_Mascotavacuna(mascotavacuna._id);
                    }
                }
            });
        }
    });
}

btnAgregar.addEventListener('click', () => {
    location.href = "registroMascota.html"

});

btnVolver.addEventListener('click', () => {
    location.href = "perfil.html"

});

btnAgregarDetalles.addEventListener('click', () => {
    location.href = "mascotaregistrodetalle.html";
});

btnSearch.addEventListener('click', () => {
    mostrar_mascotas();

})

mostrar_mascotas();
mis_mascotas();