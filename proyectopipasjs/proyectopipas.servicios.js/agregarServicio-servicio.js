const registrar_servicio = async(nombreServicio, correo, tipoMascota, precio, detalleServicio, costoServicioXhora, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-servicio',
        responseType: 'json',
        data: {
            nombreServicio: nombreServicio,
            correo: correo,
            tipoMascota: tipoMascota,
            precio: precio,
            detalleServicio: detalleServicio,
            costoServicioXhora: costoServicioXhora,
            fechaCreacion: fechaCreacion
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su servicio fue guardado exitosamente.',
            'text': response.msj
        }).then(() => {
            limpiar();
            location.href = "../proyectopipashtml/listarServicio.html";
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        });
    });
};

const listar_servicio = async() => {
    let lista_servicio = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-servicio',
        responseType: 'json'
    }).then((response) => {
        lista_servicio = response.data.lista_servicio;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_servicio;
}

const modificar_servicio = async(_id, nombreServicio, correo, precio, detalleServicio, costoServicioXhora, fechaCreacion) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-servicio',
        responseType: 'json',
        data: {
            _id: _id,
            nombreServicio: nombreServicio,
            correo: correo,
            precio: precio,
            detalleServicio: detalleServicio,
            costoServicioXhora: costoServicioXhora,
            fechaCreacion: new Date()
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El servicio ha sido actualizado.',
            'text': response.msj
        }).then(() => {
            mostrar_servicio();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
};
const eliminar_servicio = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-servicio',
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
            mostrar_servicio();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};