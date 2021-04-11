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
const listar_caracteristicas = async() => {
    let lista_caracteristicas = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-caracteristicas',
        responseType: 'json'
    }).then((response) => {
        lista_caracteristicas = response.data.lista_caracteristicas;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_caracteristicas;
}

const modificar_caracteristica = async(_id, nombreCaracteristica) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-caracteristicas',
        responseType: 'json',
        data: {
            _id: _id,
            nombreCaracteristica: nombreCaracteristica
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La caracteristica ha sido actualizada',
            'text': response.msj
        }).then(() => {
            mostrar_caracteristicas();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};
const eliminar_caracteristica = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-caracteristica',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La característica ha sido eliminada',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_caracteristicas();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};