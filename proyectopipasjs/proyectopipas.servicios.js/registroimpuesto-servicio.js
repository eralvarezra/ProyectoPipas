const listar_impuesto = async() => {
    let lista_impuesto = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-impuesto',
        responseType: 'json'
    }).then((response) => {
        lista_impuesto = response.data.lista_impuesto;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_impuesto;
}

const modificar_impuesto = async(_id, nombreImpuesto) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-impuesto',
        responseType: 'json',
        data: {
            _id: _id,
            nombreImpuesto: nombreImpuesto
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El impuesto ha sido actualizado',
            'text': response.msj
        }).then(() => {
            mostrar_impuesto();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};