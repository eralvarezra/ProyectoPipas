'use strict';
//Le quite una s a VACUNAS
const registrar_vacuna = async(nombreVacuna, fechaCreacion) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-vacuna',
        responseType: 'json',
        data: {
            nombreVacuna: nombreVacuna,
            fechaCreacion: fechaCreacion,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La vacuna se guardó exitosamente.',
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

const listar_vacunas = async() => {
    let lista_vacuna = [];
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-vacunas',
        responseType: 'json'
    }).then((response) => {
        lista_vacuna = response.data.lista_vacuna;
    }).catch((response) => {
        console.log(response.data.msj + " " + response.data.err);
    });
    return lista_vacuna;
}

const modificar_vacuna = async(_id, nombreVacuna) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-vacunas',
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
const eliminar_vacuna = async(_id) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-vacuna',
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
            mostrar_vacunas();
        });
    }).catch((response) => {
        Swal.fire({
            'title': response.msj,
            'icon': 'error',
            'text': response.err
        })
    });
};