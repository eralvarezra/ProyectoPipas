'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombreServicio = document.querySelector("#txt-general").value;
    console.log(pNombreServicio);
    await registrar_tipoServicio(pNombreServicio, pFechaCreacion);
    location.href = "../proyectopipashtml/configServicios.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configServicios.html"
});