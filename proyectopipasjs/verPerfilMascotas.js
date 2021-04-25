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

/*
const mostrar_modal_editar = async(mascota) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar mascota',
        html: `
            <div>
                <label for="txt-servicio">Tipo Servicio:</label>
                <select id="txt-servicio" required class="swal2-input" value="${proveedor.tipoServicio}">
                <option value="Transporte">Transporte</option>
                <option value="Hotel">Hotel</option>
                <option value="Corte de Pelo">Corte de Pelo	</option>
                <option value="Corte de Uñas">Corte de Uñas</option>
                <option value="Grooming">Grooming</option>
                </select>
                
            </div>
            <div>
                <label for="txt-persona">Persona Acargo:</label>
                <input type="text" id="txt-persona" required class="swal2-input" value="${proveedor.pAcargo}">
                
            </div>
            <div>
                <label for="txt-nombre">Empresa:</label>
                <input type="text" id="txt-empresa" required class="swal2-input" value="${proveedor.empresa}">
                
            </div>
            <div>
                <label for="txt-nombre">Teléfono:</label>
                <input type="text" id="txt-telefono" required class="swal2-input" value="${proveedor.telefono}">
            
            </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                proveedor._id,
                document.querySelector('#txt-servicio').value,
                document.querySelector('#txt-persona').value,
                document.querySelector('#txt-empresa').value,
                document.querySelector('#txt-telefono').value,
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
            modificar_proveedor(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4]);
        }
    }
}*/

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

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = (mascota.fotoMascota);
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
                mostrar_modal_editar(proveedor);
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
                        text: 'Está seguro que desea eliminar la mascota',
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

    for (var i = tabla2.rows.length - 1; i > 0; i--) {
        tabla2.deleteRow(i);
    }
    for (var i = tabla3.rows.length - 1; i > 0; i--) {
        tabla3.deleteRow(i);
    }
    for (var i = tabla4.rows.length - 1; i > 0; i--) {
        tabla4.deleteRow(i);
    }

    lista_mascotacaracteristica.forEach((mascotacaracteristica) => {
        let fila = tabla2.insertRow();
        if (mascotacaracteristica.correo === pCorreo && mascotacaracteristica.nombreMascota === pFiltro) {
            fila.insertCell().innerHTML = (mascotacaracteristica.nombreCaracteristica);
        } else {
            fila.insertCell().innerHTML = "No posee";
        }
        //editar
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.classList.add("far")
        boton_editar.classList.add("fa-edit")
        boton_editar.classList.add("btn2")
        boton_editar.type = 'button';


        boton_editar.addEventListener('click', async() => {
            mostrar_modal_editar(mascotacaracteristica);
        })
        celda_editar.appendChild(boton_editar);

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
                    text: 'Está seguro que desea eliminar la mascota',
                    confirmButtonText: `Si`,
                    showCancelButton: true
                });
                if (accept) {
                    eliminar_mascota(mascota._id);
                }
            }
        });
    });

    lista_mascotapad.forEach((padecimiento) => {

        let fila = tabla3.insertRow();
        if (padecimiento.correo === pCorreo && padecimiento.nombreMascota === pFiltro) {
            fila.insertCell().innerHTML = (padecimiento.nombrePadecimiento);
        } else {
            fila.insertCell().innerHTML = "No posee";
        }
        //editar
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.classList.add("far")
        boton_editar.classList.add("fa-edit")
        boton_editar.classList.add("btn2")
        boton_editar.type = 'button';

        boton_editar.addEventListener('click', async() => {
            mostrar_modal_editar(padecimiento);
        })
        celda_editar.appendChild(boton_editar);

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
                    text: 'Está seguro que desea eliminar la mascota',
                    confirmButtonText: `Si`,
                    showCancelButton: true
                });
                if (accept) {
                    eliminar_mascota(mascota._id);
                }
            }
        });
    });

    lista_mascotavacuna.forEach((mascotavacuna) => {
        let fila = tabla4.insertRow();
        if (mascotavacuna.correo === pCorreo && mascotavacuna.nombreMascota === pFiltro) {
            fila.insertCell().innerHTML = (mascotavacuna.nombreVacuna);
        } else {
            fila.insertCell().innerHTML = "No posee";
        }

        //editar
        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.classList.add("far")
        boton_editar.classList.add("fa-edit")
        boton_editar.classList.add("btn2")
        boton_editar.type = 'button';

        boton_editar.addEventListener('click', async() => {
            mostrar_modal_editar(mascotavacuna);
        })

        celda_editar.appendChild(boton_editar);
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
                    text: 'Está seguro que desea eliminar la mascota',
                    confirmButtonText: `Si`,
                    showCancelButton: true
                });
                if (accept) {
                    eliminar_mascota(mascota._id);
                }
            }
        });
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