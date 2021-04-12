'use strict';

const registrar_metodo = async(nombreMetodo, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-metodo',
        responseType: 'json',
        data: {
            nombreMetodo: nombreMetodo,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El metodo de pago fue guardado exitosamente',
            'text': response.msj
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        });
    });
};

const listar_metodos = async() => {
    let lista_metodo = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-metodos',
        responseType: 'json'
    }).then((response) => {
        lista_metodo = response.data.lista_metodo;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_metodo;
}

const modificar_metodo = async(_id, nombreMetodo) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-metodos',
        responseType: 'json',
        data: {
            _id: _id,
            nombreMetodo: nombreMetodo
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El metodo de pago ha sido actualizado',
            'text': response.msj
        }).then(() => {
            mostrar_metodo();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};
// const eliminar_metodo = async(_id) => {
//     await axios({
//         method: 'delete',
//         url: 'http://localhost:3000/api/eliminar-vacuna',
//         responseType: 'json',
//         data: {
//             _id: _id
//         }
//     }).then((response) => {
//         Swal.fire({
//             'title': 'El metodo de pago ha sido eliminada',
//             'icon': 'success',
//             'text': response.msj
//         }).then(() => {
//             mostrar_vacunas();
//         });
//     }).catch((response) => {
//         Swal.fire({
//             'title': response.msj,
//             'icon': 'error',
//             'text': response.err
//         })
//     });
// };