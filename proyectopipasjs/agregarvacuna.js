'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombreVacuna = document.querySelector("#txt-general").value;
    console.log(pNombreVacuna);
    await registrar_vacunas(pNombreVacuna, pFechaCreacion);
    location.href = "../proyectopipashtml/configVacunas.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configVacunas.html"
});