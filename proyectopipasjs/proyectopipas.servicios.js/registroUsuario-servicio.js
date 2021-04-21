'use strict';

const registrar_usuario = async(nombre, apellido, tipoIdentificacion, identificacion, fechaNacimiento, provincia, canton, distrito, genero, cantidadMascotas, telefono, correo, numeroTarjeta, fechaVencimiento, foto, activo, estado) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-usuario',
        responseType: 'json',
        data: {
            nombre: nombre,
            apellido: apellido,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion,
            fechaNacimiento: fechaNacimiento,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            genero: genero,
            cantidadMascotas: cantidadMascotas,
            telefono: telefono,
            correo: correo,
            numeroTarjeta: numeroTarjeta,
            fechaVencimiento: fechaVencimiento,
            foto: foto,
            estado: estado,
            activo: activo

        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su reserva ha sido enviada',
            'text': response.msj
        }).then(() => {
            limpiar();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};

const listar_usuario = async() => {
    let lista_usuario = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-usuario',
        responseType: 'json'
    }).then((response) => {
        lista_usuario = response.data.lista_usuario;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_usuario;
}
const modificar_usuario = async(_id, nombre, apellido, telefono, genero, identificacion, numeroTarjeta, fechaVencimiento) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-usuario',
        responseType: 'json',
        data: {
            _id: _id,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            genero: genero,
            identificacion: identificacion,
            numeroTarjeta: numeroTarjeta,
            fechaVencimiento: fechaVencimiento
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La información ha sido actualizada',
            'text': response.msj
        }).then(() => {
            mostrar_usuario();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};
const cambiar_estado = async(_id, estado_actual) => {
    let url_dinamico;
    if (estado_actual.toUpperCase() == "INACTIVO") {
        url_dinamico = 'http://localhost:3000/api/activar-usuario';
    } else {
        url_dinamico = 'http://localhost:3000/api/desactivar-usuario';
    }

    await axios({
        method: 'put',
        url: url_dinamico,
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El estado del usuario se modificó correctamente',
            'text': response.msj
        }).then(() => {
            mostrar_usuario();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
}