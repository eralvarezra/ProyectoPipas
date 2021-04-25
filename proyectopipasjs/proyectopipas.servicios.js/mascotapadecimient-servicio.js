'use strict';
//Le quite una s a VACUNAS
const registrar_mascotapadecimiento = async(correo, nombreMascota, nombrePadecimiento) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-mascotavacuna',
        responseType: 'json',
        data: {
            correo: correo,
            nombreMascota: nombreMascota,
            nombrePadecimiento: nombrePadecimiento,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'El padecimiento de su mascota fue guardada exitosamente.',
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

const lista_mascotapadecimiento = async() => {
    let lista_mascotapadecimiento = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-MascotaVacuna',
        responseType: 'json'
    }).then((response) => {
        lista_mascotapadecimiento = response.data.lista_mascotapadecimiento;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_mascotapadecimiento;
}

const modificar_mascotapadecimiento = async(_id, nombreVacuna) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-mascotavacunas',
        responseType: 'json',
        data: {
            _id: _id,
            nombreVacuna: nombreVacuna
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La vacuna ha sido actualizada.',
            'text': response.msj
        }).then(() => {
            mostrar_vacuna();
        });
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        }).then(() => {});
    });
};
const eliminar_mascotapadecimiento = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-Mascotavacuna',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'El padecimiento de la mascota ha sido eliminada.',
            'icon': 'success',
            'text': response.msj
        }).then(() => {
            mostrar_vacuna();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};