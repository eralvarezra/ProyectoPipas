'use strict'
const rdbtnvacuna = document.getElementById("vacuna");
const rdbtnpadecimiento = document.getElementById("padecimiento");
const rdbtncaracteristica = document.getElementById("caracteristica");
const slct_nombreMascota = document.getElementById("nombreMascota");
const labelValorDetalle = document.getElementById("lbl-valordetalle");
const slct_ValorDetalle = document.getElementById("valordetalle");
const btnGuardar = document.getElementById("btn-guardar");
const btnVolver = document.getElementById("btn-volver");

function readCookie(pCookie) {
    const nameString = pCookie + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    }
}

const cargar_mascotas = async() => {
    let mascotas = await listar_mascotas();
    let correo = readCookie("correo");
    correo = correo.replace("=", "");

    mascotas.forEach((mascota) => {
        if (mascota.correo === correo) {
            console.log(mascota.correo)
            let option = document.createElement('option');
            option.innerHTML = mascota.nombreMascota;
            option.value = mascota.nombreMascota;
            slct_nombreMascota.appendChild(option);
        }
    });
}
const padecimiento = async() => {
    let lista_padecimientos = await listar_padecimientos();
    if (rdbtnpadecimiento.checked) {
        labelValorDetalle.innerHTML = "";
        labelValorDetalle.innerHTML = "Padecimiento";
        labelValorDetalle.text = "Padecimiento";
        let cantidadhijos = document.getElementById("valordetalle").childElementCount;
        console.log(cantidadhijos)
        for (let i = 1; i < cantidadhijos; i++) {
            slct_ValorDetalle[i].removeChild()
        }
        lista_padecimientos.forEach((padecimientos) => {
            let optiondetalle = document.createElement('option');
            optiondetalle.innerHTML = padecimientos.nombrePadecimiento;
            optiondetalle.value = padecimientos.nombrePadecimiento;
            slct_ValorDetalle.appendChild(optiondetalle);
        });
    }
}

const vacuna = async() => {
    let listavacunas = await listar_vacunas();
    let cantidadhijos = document.getElementById("valordetalle").childElementCount;
    for (let i = 1; i < cantidadhijos; i++) {
        slct_ValorDetalle[i].removeChild()
    }
    if (rdbtnvacuna.checked) {
        labelValorDetalle.innerHTML = "";
        labelValorDetalle.innerHTML = "Vacuna";
        labelValorDetalle.text = "Vacuna";

        console.log(cantidadhijos)
        listavacunas.forEach((vacuna) => {
            let optiondetalle = document.createElement('option');
            optiondetalle.innerHTML = vacuna.nombreVacuna;
            optiondetalle.value = vacuna.nombreVacuna;
            slct_ValorDetalle.appendChild(optiondetalle);
        });
    }
}

const caracteristica = async() => {
    let lista_caracteristica = await listar_caracteristicas();
    let cantidadhijos = document.getElementById("valordetalle").childElementCount;
    console.log(document.getElementById('valordetalle'))
    for (let i = 1; i < cantidadhijos; i++) {
        slct_ValorDetalle[i].removeChild()
    }
    if (rdbtncaracteristica.checked) {
        console.log(cantidadhijos)
        labelValorDetalle.innerHTML = "";
        labelValorDetalle.innerHTML = "Característica";
        labelValorDetalle.text = "Caracteristica";
        lista_caracteristica.forEach((caracteristica) => {
            let optiondetalle = document.createElement('option');
            optiondetalle.innerHTML = caracteristica.nombreCaracteristica;
            optiondetalle.value = caracteristica.nombreCaracteristica;
            slct_ValorDetalle.appendChild(optiondetalle);
        });
    }
}

const registrar_detalle = () => {

}


btnGuardar.addEventListener('click',
    registrar_detalle()
);

btnVolver.addEventListener('click', () => {
    location.href = "verPerfilMascota.html";
});
rdbtnpadecimiento.addEventListener('click', () => {
    padecimiento();
});
rdbtnvacuna.addEventListener('click', () => {
    vacuna();
});

rdbtncaracteristica.addEventListener('click', () => {
    caracteristica();
});
registrar_detalle();
cargar_mascotas();