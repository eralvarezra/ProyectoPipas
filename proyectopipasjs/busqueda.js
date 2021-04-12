const rate5 = document.getElementById("rate5");
const rate4 = document.getElementById("rate4");
const rate3 = document.getElementById("rate3");
const rate2 = document.getElementById("rate2");
const rate1 = document.getElementById("rate1");
const tipoMascota = document.getElementById("tipoMascota");
const tipoServicio = document.getElementById("tipoServicio");
const provincia = document.getElementById("provincias");
const canton = document.getElementById("cantones");
const distrito = document.getElementById("distritos");
const btnBuscar = document.getElementById("btnBuscar");
const tabla = document.querySelector("#tbl-resultados tbody");

buscar_proveedores = () => {


}

const mostrar_modal_editar = async(servicio) => {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Servicio',
        html: `
        <div>
            <label for="txt-nombre">Nombre:</label>
            <input type="text" id="txt-nombre" required class="swal2-input" value="${servicio.nombreServicio}">
            <label for="txt-correo">Correo:</label>
            <input type="text" id="txt-correo" required class="swal2-input" value="${servicio.correo}">
            <label for="num-precio">Precio:</label>
            <input type="text" id="num-precio" required class="swal2-input" value="${servicio.precio}">
            <label for="txt-detalleServicio">Detalle Servicio:</label>
            <input type="text" id="txt-detalleServicio" required class="swal2-input" value="${servicio.detalleServicio}">
            <label for="num-costoServicioXhora">Costo por Hora:</label>
            <input type="text" id="num-costoServicioXhora" required class="swal2-input" value="${servicio.costoServicioXhora}">
        </div>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                servicio._id,
                document.querySelector('#txt-nombre').value,
                document.querySelector('#txt-correo').value,
                document.querySelector('#num-precio').value,
                document.querySelector('#txt-detalleServicio').value,
                document.querySelector('#num-costoServicioXhora').value,
            ]
        }
    });
    if (formValues) {
        const { value: accept } = await Swal.fire({
            icon: 'warning',
            text: 'Está seguro que desea modificar el Servicio',
            confirmButtonText: `Si`,
            showCancelButton: true
        });
        if (accept) {
            modificar_servicio(formValues[0], formValues[1], formValues[2], formValues[3], formValues[4], formValues[5]);
        }
    }
}

const mostrar_servicio = async() => {
    let lista_servicio = await listar_servicio();
    console.log(lista_servicio);
    tabla.innerHTML = '';
    let filtro = "";

    lista_servicio.forEach((servicio) => {
        console.log(servicio);
        if (servicio.correo.includes(filtro)) {

            let fila = tabla.insertRow();
            fila.insertCell().innerHTML = servicio.correo;
            fila.insertCell().innerHTML = servicio.detalleServicio;

            let celda_editar = fila.insertCell();
            let boton_editar = document.createElement('button');
            boton_editar.classList.add("fas")
            boton_editar.classList.add("fa-cat")
            boton_editar.style.backgroundColor = "orange";
            boton_editar.type = 'button';

            boton_editar.addEventListener('click', async() => {
                mostrar_modal_editar(servicio);
            })
            celda_editar.appendChild(boton_editar);


        }

    });

};

btnBuscar.addEventListener("click", buscar_proveedores);

window.onload = mostrar_servicio;