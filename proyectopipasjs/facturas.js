'use strict';

const btnAbrir = document.querySelector('#btn-Abrir');

const abrir = () => {
    window.open("../facturasServicio.html")
}

btnAbrir.addEventListener('click', abrir);