'use strict';

const obtener_mascotas = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let lista_mascota = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-mascota', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        lista_mascota = response.data.lista_mascota;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_mascota;
};