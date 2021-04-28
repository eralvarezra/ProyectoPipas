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


const buscar_usuario_correo = async(correo) => {
    let usuario;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/buscar-por-correo-usuario',
        responseType: 'json',
        params: {
            correo: correo
        }
    }).then((response) => {
        usuario = response.data.usuario_db;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return usuario;
}




const actualizar_contrasena = async(correo, contrasena) => {
    //busca el usuario: ven este caso no tenemos el ID, vamos a buscarlo. como el username es unico podemos buscarlo usando este parametro
    let usuario_encontrado = false;
    console.log(`correo: ${correo}, contrasena: ${contrasena}.`);
    let usuario = await buscar_usuario_correo(correo);
    console.log('usuario', usuario);
    console.log('correo', correo)
    if (usuario != undefined) {
        if (usuario._id != undefined && usuario._id != '') {
            usuario_encontrado = true;
        }
    }
    if (usuario_encontrado) {
        await axios({
            method: 'put',
            url: 'http://localhost:3000/api/modificar-contrasena',
            responseType: 'json',
            data: {
                _id: usuario._id,
                contrasena: contrasena
            }
        }).then((response) => {
            Swal.fire({
                'icon': 'success',
                'title': 'Su contraseña ha sido modificada.',
                'text': response.msj
            }).then(() => {
                window.location.replace('../proyectopipashtml/inicio-sesion.html');
            });
        }).catch((response) => {
            Swal.fire({
                'icon': 'error',
                'text': response.msj,
                'title': 'Ocurrió un error inesperado.',
            }).then(() => {});
        });
    } else {
        Swal.fire({
            'icon': 'error',
            'text': "No encontrado",
            'title': 'No se encontró el usuario.',
        }).then(() => {});
    }
}