'use strict'
const rdbtnvacuna = document.getElementById("vacuna");
const rdbtnpadecimiento = document.getElementById("padecimiento");
const rdbtncaracteristica = document.getElementById("caracteristica");
const slct_nombreMascota = document.getElementById("nombreMascota");
const labelValorDetalle = document.getElementById("lbl-valordetalle");
const slct_vacuna = document.getElementById("slctvacunas");
const slct_padecimiento = document.getElementById("slctpadecimiento");
const slct_caracteristica = document.getElementById("slctcaracteristica");
const btnGuardar = document.getElementById("btn-guardar");
const btnVolver = document.getElementById("btn-volver");

slct_padecimiento.style.display = "none";
slct_caracteristica.style.display = "none";
slct_vacuna.style.display = "none";

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
        slct_padecimiento.style.display = "inline-block";
        slct_caracteristica.style.display = "none";
        slct_vacuna.style.display = "none";

        if (slct_padecimiento.childElementCount < 2) {
            lista_padecimientos.forEach((padecimientos) => {
                let optiondetalle = document.createElement('option');
                optiondetalle.innerHTML = padecimientos.nombrePadecimiento;
                optiondetalle.value = padecimientos.nombrePadecimiento;
                slct_padecimiento.appendChild(optiondetalle);
            });
        }
    }
}

const vacuna = async() => {
    let listavacunas = await listar_vacunas();
    if (rdbtnvacuna.checked) {
        labelValorDetalle.innerHTML = "";
        labelValorDetalle.innerHTML = "Vacuna";
        labelValorDetalle.text = "Vacuna";


        slct_padecimiento.style.display = "none";
        slct_caracteristica.style.display = "none";
        slct_vacuna.style.display = "inline-block";
        if (slct_vacuna.childElementCount < 2) {
            listavacunas.forEach((vacuna) => {
                let optiondetalle = document.createElement('option');
                optiondetalle.innerHTML = vacuna.nombreVacuna;
                optiondetalle.value = vacuna.nombreVacuna;
                slct_vacuna.appendChild(optiondetalle);
            });
        }
    }
}

const caracteristica = async() => {
    let lista_caracteristica = await listar_caracteristicas();

    if (rdbtncaracteristica.checked) {

        labelValorDetalle.innerHTML = "";
        labelValorDetalle.innerHTML = "Característica";
        labelValorDetalle.text = "Caracteristica";

        slct_padecimiento.style.display = "none";
        slct_caracteristica.style.display = "inline-block";
        slct_vacuna.style.display = "none";

        if (slct_caracteristica.childElementCount < 2) {
            lista_caracteristica.forEach((caracteristica) => {
                let optiondetalle = document.createElement('option');
                optiondetalle.innerHTML = caracteristica.nombreCaracteristica;
                optiondetalle.value = caracteristica.nombreCaracteristica;
                slct_caracteristica.appendChild(optiondetalle);
            });
        }
    }
}

const registrar_detalle = () => {
    let nombreMascota = slct_nombreMascota.value;
    let vacunaValor = slct_vacuna.value;
    let padecimientoValor = slct_padecimiento.value;
    let caracteristicaValor = slct_caracteristica.value;
    let correo = readCookie("correo");
    correo = correo.replace("=", "");

    if (labelValorDetalle === "Vacuna") {
        registrar_mascotavacuna(correo, nombreMascota, vacunaValor);
    }

    if (labelValorDetalle === "Caracteristica") {
        registrar_mascotacaracteristica(correo, nombreMascota, caracteristicaValor);
        console.log(correo, nombreMascota, caracteristicaEspecial);
    }

    if (labelValorDetalle === "Padecimiento") {
        registrar_mascotapadecimiento(correo, nombreMascota, padecimientoValor);

    }


}

btnGuardar.addEventListener('click', () => {
    registrar_detalle()
});

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

cargar_mascotas();