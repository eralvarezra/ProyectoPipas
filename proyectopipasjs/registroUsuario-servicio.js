'use strict';

const registrar_usuario = async(nombre, apellido, tipoIdentificacion, identificacion, fechaNacimiento, genero, cantidadMascotas,
    telefono, correo, numeroTarjeta, fechaVencimiento, provincia, canton, distrito, foto) => {
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
            genero: genero,
            cantidadMascotas: cantidadMascotas,
            telefono: telefono,
            correo: correo,
            numeroTarjeta: numeroTarjeta,
            fechaVencimiento: fechaVencimiento,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            foto: foto
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