'use strict';

const obtener_login = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let datos_login = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/datos-login', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        datos_login = response.data.datos_login;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return datos_login;
};