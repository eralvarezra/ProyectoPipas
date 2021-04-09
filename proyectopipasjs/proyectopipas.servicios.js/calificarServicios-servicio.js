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