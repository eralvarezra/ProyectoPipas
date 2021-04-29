'use strict';

const registrar_mascotacaracteristica = async(correo, nombreMascota, caracteristicaEspecial) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-mascotacaracteristica',
        responseType: 'json',
        data: {
            correo: correo,
            nombreMascota: nombreMascota,
            caracteristicaEspecial: caracteristicaEspecial
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El detalle de su mascota fue guardada exitosamente',
            'text': response.msj
        }).then(() => {
            location.href = "../proyectopipashtml/verPerfilMascota.html";
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado',
        });
    });
};

const listar_mascotaCaracteristica = async() => { // esta es la funcion que se usa en el controlador, que llama la funcion
    let lista_MascotaCS = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-mascotacaracteristica', // con este link se puede probar si la collection es visible en postman
        responseType: 'json',
    }).then((response) => {
        lista_MascotaCS = response.data.lista_MascotaCS;
    }).catch((response) => {
        console.log(response.data.err);
    });
    return lista_MascotaCS;
};

const eliminar_mascotaCaracteristica = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-mascotacaracteristica',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La mascota ha sido eliminada',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_mascotas();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};

const modificar_mascotaCaracteristica = async(_id, nombreMascota) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-mascotaCaracteristica',
        responseType: 'json',
        data: {
            _id: _id,
            nombreMascota: nombreMascota,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La información ha sido actualizada.',
            'text': response.msj
        }).then(() => {
            mostrar_mascotas();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
};