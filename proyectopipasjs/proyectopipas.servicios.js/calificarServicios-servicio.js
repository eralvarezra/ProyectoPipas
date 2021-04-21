'use strict';

const registrar_calificacion = async(nombreProveedor, comentario, calificacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/calificar-servicio',
        responseType: 'json',
        data: {
            nombreProveedor: nombreProveedor,
            comentario: comentario,
            calificacion: calificacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su calificación fue enviada exitosamente',
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
const listar_comentario = async() => {
    let lista_comentario = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-comentario',
        responseType: 'json'
    }).then((response) => {
        lista_comentario = response.data.lista_comentario;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_comentario;
}

const eliminar_comentario = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-comentario',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'El comentario ha sido eliminado',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_comentario();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};