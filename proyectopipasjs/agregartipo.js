'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombreTipo = document.querySelector("#txt-general").value;
    console.log(pNombreTipo);
    await registrar_tipo(pNombreTipo, pFechaCreacion);
    location.href = "../proyectopipashtml/configTipo.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configTipo.html"
});