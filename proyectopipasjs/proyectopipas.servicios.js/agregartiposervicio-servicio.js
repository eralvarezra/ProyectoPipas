const registrar_tipoServicio = async(nombreServicio, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-tipoServicio',
        responseType: 'json',
        data: {
            nombreServicio: nombreServicio,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su servicio fue guardado exitosamente.',
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
const listar_tipoServicio = async() => {
    let lista_tipoServicio = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tipoServicio',
        responseType: 'json'
    }).then((response) => {
        lista_tipoServicio = response.data.lista_tipoServicio;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_tipoServicio;
}

const modificar_tipoServicio = async(_id, nombreServicio) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-tipoServicio',
        responseType: 'json',
        data: {
            _id: _id,
            nombreServicio: nombreServicio
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El servicio ha sido actualizado.',
            'text': response.msj
        }).then(() => {
            mostrar_tipoServicio();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
};
const eliminar_tipoServicio = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-tipoServicio',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'El servicio ha sido eliminado.',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_tipoServicio();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};