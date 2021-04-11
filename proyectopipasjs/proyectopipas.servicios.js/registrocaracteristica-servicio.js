const registrar_caracteristica = async(nombreCaracteristica, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-caracteristica',
        responseType: 'json',
        data: {
            nombreCaracteristica: nombreCaracteristica,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su caracteristica fue guardada exitosamente',
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