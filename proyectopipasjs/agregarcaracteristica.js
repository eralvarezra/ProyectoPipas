'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombreCaracteristica = document.querySelector("#txt-general").value;
    console.log(pNombreCaracteristica);
    await registrar_caracteristica(pNombreCaracteristica, pFechaCreacion);
    location.href = "../proyectopipashtml/configCaracteristicasEspeciales.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configCaracteristicasEspeciales.html"
});