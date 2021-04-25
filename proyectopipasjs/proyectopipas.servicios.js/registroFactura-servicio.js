const registrar_factura = async(nombreEmpresa, tipoServicio, descripcion, precio, correoUsuario, correoProveedor, estado, aprobar) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-factura',
        responseType: 'json',
        data: {
            nombreEmpresa: nombreEmpresa,
            tipoServicio: tipoServicio,
            descripcion: descripcion,
            precio: precio,
            correoUsuario: correoUsuario,
            correoProveedor: correoProveedor,
            estado: estado,
            aprobar: aprobar
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su factura fue guardada exitosamente.',
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
const cambiar_estado1 = async(_id, estado_actual) => {
    let url_dinamico;
    if (estado_actual.toUpperCase() == "NO COMPLETADO") {
        url_dinamico = 'http://localhost:3000/api/activar-servicio';
    } else {
        url_dinamico = 'http://localhost:3000/api/desactivar-servicio';
    }

    await axios({
        method: 'put',
        url: url_dinamico,
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El estado del servicio se modificó correctamente.',
            'text': response.msj
        }).then(() => {
            mostrar_factura();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
}
const aprobar_estado = async(_id, es_activar) => {
    let url_dinamico;
    if (es_activar) {
        url_dinamico = 'http://localhost:3000/api/aceptar-servicio';
    } else {
        url_dinamico = 'http://localhost:3000/api/rechazar-servicio';
    }

    await axios({
        method: 'put',
        url: url_dinamico,
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El estado del proveedor se modificó correctamente.',
            'text': response.msj
        }).then(() => {
            mostrar_factura();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
}
const listar_factura = async() => {
    let lista_factura = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-factura',
        responseType: 'json'
    }).then((response) => {
        lista_factura = response.data.lista_factura;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_factura;
}