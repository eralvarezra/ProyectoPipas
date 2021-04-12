'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombrePadecimiento = document.querySelector("#txt-general").value;
    console.log(pNombrePadecimiento);
    await registrar_padecimiento(pNombrePadecimiento, pFechaCreacion);
    location.href = "../proyectopipashtml/configPadecimientos.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configPadecimientos.html"
});