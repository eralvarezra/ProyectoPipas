'use strict';

const registrar_raza = async(nombreRaza, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-raza',
        responseType: 'json',
        data: {
            nombreRaza: nombreRaza,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su raza fue guardada exitosamente.',
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

const listar_razas = async() => {
    let lista_raza = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-raza',
        responseType: 'json'
    }).then((response) => {
        lista_raza = response.data.lista_raza;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_raza;
}

const modificar_raza = async(_id, nombreRaza) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-razas',
        responseType: 'json',
        data: {
            _id: _id,
            nombreRaza: nombreRaza
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La raza ha sido actualizada.',
            'text': response.msj
        }).then(() => {
            mostrar_raza();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
};
const eliminar_raza = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-raza',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La raza ha sido eliminada.',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_raza();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};