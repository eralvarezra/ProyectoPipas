'use strict';
const correoElectronico = document.getElementById("txt-Usuario");
const contrasena = document.getElementById("pass-Contrasena");
const btnIniciarSesion = document.getElementById("btn-Login");
const btnRegistrase = document.getElementById("btn-Registrarse");
const btnPassReset = document.getElementById("btn-PassReset");
const btnFormRegistro = document.getElementById("btn-FormRegistro");
const popupregistro = document.querySelector("#sct-popupRegistro");
const btnVolver = document.getElementById("btn-Cancelar");
const popupPassReset = document.querySelector("#sct-popupPassReset");
const btnVolverPassReset = document.getElementById("btn-Volver");
const btnPassResetEnviar = document.getElementById("btn-PassResetEnviar");
const correoPassReset = document.getElementById("txt-correoPassReset");
const cookie = document.cookie;


// leer cookies
function readCookie(pCookie) {
    const nameString = pCookie + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    } else {
        return ""
    }
}

const obtener_datosLogin = async() => {
    let datos_login = await obtener_login();
    console.log(datos_login);
    console.log(datos_login[0]);
    console.log(datos_login[0].correo);
}

const obtenerDatos = () => {
    obtener_datosLogin();
    let email = correoElectronico.value;
    let pass = contrasena.value;

    let tipoperfil = readCookie("tipoperfil");
    let correoValidacion = readCookie("correo");
    let passwordValidacion = readCookie("password");

    correoValidacion = correoValidacion.replace("=", "");
    passwordValidacion = passwordValidacion.replace("=", "");

    if (correoValidacion === email && passwordValidacion === pass) {
        limpiar();

        Swal.fire({
            'icon': 'success',
            'title': 'Bienvenido',
            'text': 'PETLOVER a su servicio'
        }).then(() => {
            limpiar();
            location.href = 'perfil.html'
        });
    } else {
        if (email === "adminPetLover@gmail.com" && pass === "contraSena22!") {
            tipoperfil = "A";
            document.cookie = "tipoperfil=" + tipoperfil;
            Swal.fire({
                'icon': 'success',
                'title': 'Bienvenido',
                'text': 'PETLOVER a su servicio'
            }).then(() => {
                limpiar();
                location.href = 'configuracion.html'
            });
        } else {
            if (email === "eric.alvarez@gmail.com" && pass === "30204E@@ras2312!") {
                tipoperfil = "U";
                document.cookie = "tipoperfil=" + tipoperfil;
                Swal.fire({
                    'icon': 'success',
                    'title': 'Bienvenido',
                    'text': 'PETLOVER a su servicio'
                }).then(() => {
                    limpiar();
                    location.href = 'perfil.html'
                });
            } else {
                Swal.fire({
                    'icon': 'warning',
                    'title': 'Su cuenta no existe',
                    'text': 'Por favor registrese e intente de nuevo.'
                });
            }
        }
    }
}

const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    correoElectronico.value = "";
    contrasena.value = "";
}

const validar = () => {
    let error = false;
    let campos_requeridos = document.querySelectorAll(':required');
    campos_requeridos.forEach(campo => {
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });

    let regExp_formatoEmail = /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp_formatoEmail.test(correoElectronico.value)) {
        error = true;
        correoElectronico.classList.add('error-input');
    } else {
        correoElectronico.classList.remove('error-input');
    }

    let regExp_formatoContra = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{12,}$/;
    if (!regExp_formatoContra.test(contrasena.value)) {
        error = true;
        contrasena.classList.add('error-input');
    } else {
        contrasena.classList.remove('error-input');
    }

    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'Datos Inválidos',
            'text': 'Por favor revise los campos resaltados'
        });
    }
}

function sendEmail() {
    Swal.fire({
        'icon': 'success',
        'title': 'Correo enviado',
        'text': 'Revise por favor su correo y siga los pasos para recuperar su contraseña.'
    });
}


btnIniciarSesion.addEventListener('click', validar);
btnRegistrase.addEventListener('click', () => {
    popupregistro.style.display = "block";
});

btnVolver.addEventListener('click', () => {
    popupregistro.style.display = "none";
});

btnFormRegistro.addEventListener('click', () => {

    if (document.getElementById("rbtn-Proveedor").checked) {
        location.href = "registroProveedores.html";
    }
    if (document.getElementById("rbtn-Usuario").checked) {
        location.href = "registroUsuario.html";
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje',
            'text': 'Por favor seleccione una opción'
        });
    }
});

btnPassReset.addEventListener('click', () => {
    popupPassReset.style.display = "block";
})

btnPassResetEnviar.addEventListener('click', () => {
    var correo = correoPassReset;
    sendEmail();
});

btnVolverPassReset.addEventListener('click', () => {
    popupPassReset.style.display = "none";
});