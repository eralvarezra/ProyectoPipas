const registrar_tipo = async(nombreTipo, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-tipo',
        responseType: 'json',
        data: {
            nombreTipo: nombreTipo,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su tipo fue guardado exitosamente',
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
const listar_tipo = async() => {
    let lista_tipo = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tipo',
        responseType: 'json'
    }).then((response) => {
        lista_tipo = response.data.lista_tipo;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_tipo;
}

const modificar_tipo = async(_id, nombreTipo) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-tipo',
        responseType: 'json',
        data: {
            _id: _id,
            nombreTipo: nombreTipo
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La tipo ha sido actualizado',
            'text': response.msj
        }).then(() => {
            mostrar_tipo();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};
const eliminar_tipo = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-tipo',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'El tipo ha sido eliminado',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_tipo();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};