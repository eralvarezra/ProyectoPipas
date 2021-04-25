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
            'title': 'Su calificación fue enviada exitosamente.',
            'text': response.msj
        }).then(() => {
            location.href = "../proyectopipashtml/perfil.html";
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        });

    });
};

const listar_calificacion = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let lista_calificacion = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-calificacion', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        lista_calificacion = response.data.lista_calificacion;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_calificacion;
};