'use strict';

const obtenerFormulario = async(nombreUsuario, telefonoUsuario, correoUsuario, comentarioUsuario) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-contactoadmin',
        responseType: 'json',
        data: {
            nombreUsuario: nombreUsuario,
            telefonoUsuario: telefonoUsuario,
            correoUsuario: correoUsuario,
            comentarioUsuario: comentarioUsuario,

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su usuario ha sido registrado.',
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


/*
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
*/