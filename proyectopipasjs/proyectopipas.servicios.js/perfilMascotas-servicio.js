'use strict';

const registrar_mascota = async() => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-mascota',
        responseType: 'json',
        data: {
            nombreMascota: nombreMascota,
            tipoMascota: tipoMascota,
            tipoRaza: tipoRaza,
            fotoMascota: fotoMascota,
            correo: correo
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su mascota fue guardada exitosamente.',
            'text': response.msj
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        });
    });
};

const listar_mascotas = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let lista_mascotas = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-mascota', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        lista_mascotas = response.data.lista_mascotas;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_mascotas;
};

const eliminar_mascota = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-mascota',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La mascota ha sido eliminada.',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_mascotas();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};