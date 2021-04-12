'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombreRaza = document.querySelector("#txt-general").value;
    console.log(pNombreRaza);
    await registrar_raza(pNombreRaza, pFechaCreacion);
    location.href = "../proyectopipashtml/configRaza.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configRaza.html"
});