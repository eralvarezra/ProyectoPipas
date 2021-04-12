'use strict';
const btnAgregar = document.getElementById('btn-enviar');
const btnCancelar = document.getElementById('btn-cancelar');
let pFechaCreacion = new Date();

console.log(pFechaCreacion);


const enviar_informacion = async() => {
    const pNombreMetodo = document.querySelector("#txt-general").value;
    console.log(pNombreMetodo);
    await registrar_metodo(pNombreMetodo, pFechaCreacion);
    location.href = "../proyectopipashtml/configMetodoPago.html"
}

btnAgregar.addEventListener('click', enviar_informacion);
btnCancelar.addEventListener("click", () => {
    location.href = "../proyectopipashtml/configMetodoPago.html"
});