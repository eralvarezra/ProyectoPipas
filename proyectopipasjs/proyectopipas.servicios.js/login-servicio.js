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


const obtener_login_proveedor = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let datos_login = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/datos-login-proveedor', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        datos_login = response.data.datos_login;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return datos_login;
};

const obtener_login_usuario = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let datos_login = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/datos-login-usuario', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        datos_login = response.data.datos_login;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return datos_login;
};


const obtenerRecuperar = async(nombre, correo, contrasena, ) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-recuperar',
        responseType: 'json',
        data: {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su mensaje ha sido enviado.',
            'text': response.msj
        }).then(() => {
            limpiar();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
};