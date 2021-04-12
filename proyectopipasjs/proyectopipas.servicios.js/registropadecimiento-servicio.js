const registrar_padecimiento = async(nombrePadecimiento, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-padecimiento',
        responseType: 'json',
        data: {
            nombrePadecimiento: nombrePadecimiento,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento fue guardada exitosamente',
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
const listar_padecimientos = async() => {
    let lista_padecimiento = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-padecimientos',
        responseType: 'json'
    }).then((response) => {
        lista_padecimiento = response.data.lista_padecimiento;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_padecimiento;
}

const modificar_padecimiento = async(_id, nombrePadecimiento) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-padecimientos',
        responseType: 'json',
        data: {
            _id: _id,
            nombrePadecimiento: nombrePadecimiento
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento ha sido actualizada',
            'text': response.msj
        }).then(() => {
            mostrar_padecimiento();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};
const eliminar_padecimiento = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-padecimiento',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'El padecimiento ha sido eliminada',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_padecimientos();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};