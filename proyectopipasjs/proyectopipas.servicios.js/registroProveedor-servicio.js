'use strict';

const registrar_proveedor = async(tipoProveedor, tipoServicio, tipoIdentificacion, pAcargo, empresa, contrasena, telefono, correo, provincias, cantones, distritos, comentarios, myFile, activo) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-proveedor',
        responseType: 'json',
        data: {
            tipoProveedor: tipoProveedor,
            tipoServicio: tipoServicio,
            tipoIdentificacion: tipoIdentificacion,
            pAcargo: pAcargo,
            empresa: empresa,
            contrasena: contrasena,
            telefono: telefono,
            correo: correo,
            provincias: provincias,
            cantones: cantones,
            distritos: distritos,
            comentarios: comentarios,
            myFile: myFile,
            activo: activo
        }

    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su proveedor ha sido registrado',
            'text': response.msj
        }).then(() => {
            limpiar();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        }).then(() => {});
    });
};

const listar_proveedor = async() => {
    let lista_proveedor = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-proveedor',
        responseType: 'json'
    }).then((response) => {
        lista_proveedor = response.data.lista_proveedor;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_proveedor;
}