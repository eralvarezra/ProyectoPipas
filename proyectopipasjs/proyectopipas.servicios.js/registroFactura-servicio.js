const registrar_factura = async(nombreEmpresa, tipoServicio, descripcion, precio, correoUsuario) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-factura',
        responseType: 'json',
        data: {
            nombreEmpresa: nombreEmpresa,
            tipoServicio: tipoServicio,
            descripcion: descripcion,
            precio: precio,
            correoUsuario: correoUsuario
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su factura fue guardada exitosamente',
            'text': response.msj
        }).then(() => {
            location.href = "../proyectopipashtml/perfil.html";
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        });
    });
};

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