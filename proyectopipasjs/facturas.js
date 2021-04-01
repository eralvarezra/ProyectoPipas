'use strict';

const btnAbrir = document.querySelector('#btn-Abrir');

const abrir = () => {
    window.open("../proyectopipasimgs/factura1.pdf")
}

btnAbrir.addEventListener('click', abrir);