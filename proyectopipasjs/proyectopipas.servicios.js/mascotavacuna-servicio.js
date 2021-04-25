'use strict';
//Le quite una s a VACUNAS
const registrar_mascotavacuna = async(correo, nombreMascota, nombreVacuna) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-mascotavacuna',
        responseType: 'json',
        data: {
            correo: correo,
            nombreMascota: nombreMascota,
            nombreVacuna: nombreVacuna,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'Su vacuna fue guardada exitosamente.',
            'text': response.msj
        }).then(() => {
            location.href = "../proyectopipashtml/verPerfilMascota.html";
        })
    }).catch((response) => {
        Swal.fire({
            'icon': 'error',
            'text': response.msj,
            'title': 'Ocurrió un error inesperado.',
        });
    });
};

const lista_Mascotavacuna = async() => {
    let lista_Mascotavacuna = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-MascotaVacuna',
        responseType: 'json'
    }).then((response) => {
        lista_Mascotavacuna = response.data.lista_Mascotavacuna;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_Mascotavacuna;
}

const modificar_Mascotavacuna = async(_id, nombreVacuna) => {
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
const eliminar_Mascotavacuna = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-Mascotavacuna',
        responseType: 'json',
        data: {
            _id: _id
        }
    }).then((response) => {
        Swal.fire({
            'title': 'La vacuna ha sido eliminada.',
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